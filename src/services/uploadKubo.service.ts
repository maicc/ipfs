import { create } from 'kubo-rpc-client';
import fs from 'fs';

const ipfs = create({
  host: process.env.KUBO_HOST || 'kubo',
  port: 5001,
  protocol: 'http',
  timeout: 300000
});

export const uploadKubo = async (fileInfo: any) => {
  try {
    if (!fileInfo?.path || !fs.existsSync(fileInfo.path)) {
      throw new Error(`Archivo no encontrado: ${fileInfo.path}`);
    }

    const stats = fs.statSync(fileInfo.path);
    const sizeMB = stats.size / 1024 / 1024;

    console.log(`📤 Subiendo: ${fileInfo.originalName}`);
    console.log(`📊 Tamaño: ${sizeMB.toFixed(2)} MB`);

    const stream = fs.createReadStream(fileInfo.path);
    const startTime = Date.now();
    let lastUpdate = startTime;
    let finalResult: any = null;

    // ✅ TIPADO EXPLÍCITO con 'any' para evitar error de TypeScript
    const addGen: any = ipfs.add(stream, {
      pin: true,
      cidVersion: 1,
      progress: (bytes: number) => {
        const now = Date.now();
        if (now - lastUpdate > 2000) {
          const percent = (bytes / stats.size * 100).toFixed(1);
          const uploadedMB = (bytes / 1024 / 1024).toFixed(2);
          console.log(`📈 ${percent}% - ${uploadedMB}/${sizeMB.toFixed(2)} MB`);
          lastUpdate = now;
        }
      }
    });

    // ✅ Ahora TypeScript reconoce que es iterable
    for await (const result of addGen) {
      if (!result.path) {
        finalResult = result;
      }
    }

    if (!finalResult?.cid) {
      throw new Error('No se obtuvo CID del archivo');
    }

    const cid = finalResult.cid.toString();
    const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`✅ CID: ${cid}`);
    console.log(`⏱️  Tiempo: ${uploadTime}s`);
    console.log('📡 Anunciado en DHT automáticamente');

    try {
      await fs.promises.unlink(fileInfo.path);
      console.log('🗑️  Archivo eliminado');
    } catch (error) {
      if (error instanceof Error) {
        console.warn('⚠️  No se pudo eliminar:', error.message);
      } else {
        console.warn('⚠️  No se pudo eliminar:', String(error));
      }
    }

    return {
      cid,
      size: finalResult.size?.toString() || stats.size.toString(),
      url: `https://gateway.ipfs.io/ipfs/${cid}`
    };

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
    } else {
      console.error('❌ Error:', String(error));
    }
    throw error;
  }
};
