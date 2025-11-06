import { create } from "kubo-rpc-client";
import fs from "fs"
import FormData from 'form-data'

export const uploadKubo = async (fileInfo: any) => {
    console.log('🔌 Conectando a nodo IPFS local...');

    const client = create({
        host: '127.0.0.1',
        port: 5001,
        protocol: 'http',
        timeout: 300000
    })

    const version = await client.version()
    console.log('✅ Conectado a Kubo:', version.version);


    try {
        const stats = fs.statSync(fileInfo);
        const sizeGB = stats.size / 1024 / 1024 / 1024;

        console.log(`Archivo: ${fileInfo}`)
        console.log(`Tamaño: ${sizeGB.toFixed(2)}GB`)

        console.log("Subiendo archivo grande (Esto puede tardar varios minutos)...")
        const stream = fs.createReadStream(fileInfo.path);
        const formData = new FormData();

        console.log("información " +fileInfo.path)

        formData.append('file', stream, {
            filename: fileInfo.originalName,
            contentType: fileInfo.mimetype
        });

        const result = await client.add(formData, {
            pin: true,
            cidVersion: 1,
        })

        const cid = result.cid.toString();
        console.log('\n✅ Archivo subido exitosamente');
        console.log('📌 CID:', cid);

        return {
            cid: result.cid.toString(),
            size: result.size.toString() || fileInfo.size,
            url: `https://ipfs.io/ipfs/${result.cid.toString}`
        }

    } catch (error) {
        throw new Error(
            'No se pudo conectar a IPFS DAEMON'
        )
    }


}