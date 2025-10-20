import { create, KuboRPCClient } from "kubo-rpc-client";
import fs from "fs"

export const uploadKubo = async(filePath:string)=>{
    if(!fs.existsSync(filePath)){
        throw new Error(`Archivo no encontrado ${filePath}`);
    }

    const stats = fs.statSync(filePath);
    const sizeGB = stats.size / 1024 / 1024 / 1024;

    console.log(`Archivo: ${filePath}`)
    console.log(`Tamaño: ${sizeGB.toFixed(2)}GB`)

    console.log('🔌 Conectando a nodo IPFS local...');

    const client = create({
        host: '127.0.0.1',
        port: 5001, 
        protocol: 'http',
    })

    try{
        const version = await client.version()
        console.log('✅ Conectado a Kubo:', version.version);
    } catch(error){
        throw new Error(
            'No se pudo conectar a IPFS DAEMON'
        )
    }

    console.log("Subiendo archivo grande (Esto puede tardar varios minutos)...")
    const stream = fs.createReadStream(filePath)

    const startTime = Date.now();
    let lastProgress = 0;

    const result = await client.add(stream, {
        pin: true, 
        cidVersion: 1,
    } )

    const cid = result.cid.toString();
    console.log('\n✅ Archivo subido exitosamente');
    console.log('📌 CID:', cid);

    return cid;
}