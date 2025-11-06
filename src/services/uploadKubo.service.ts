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

    // ✅ CON STREAM: Sin for await, solo await directo
    const result = await ipfs.add(stream, {
      pin: true,
      cidVersion: 1
    });

    const cid = result.cid.toString();

    console.log(`✅ CID: ${cid}`);
    console.log('📡 Anunciado en DHT');

    try {
      await fs.promises.unlink(fileInfo.path);
      console.log('🗑️  Archivo eliminado');
    } catch (error) {
      console.warn('⚠️  No se pudo eliminar:', error);
    }

    return {
      cid,
      size: result.size?.toString() || stats.size.toString(),
      url: `https://gateway.ipfs.io/ipfs/${cid}`
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};
