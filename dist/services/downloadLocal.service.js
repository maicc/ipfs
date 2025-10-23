import axios from "axios";
import fs from "fs";
const gateways = [
    "https://dweb.link",
    "https://gw.crust-gateway.xyz",
    "https://gw.crust-gateway.com",
    "https://ipfs.io"
];
const cid = "bafybeidyvxwcpgzopztf34lrlkcqwigrlfwpccyclzf4lvgo7vyjufdfya";
export const downloadFiles = async () => {
    console.log("hola");
    const stream = fs.createWriteStream('file');
    const response = await downloadWithFallback();
    if (!response) {
        console.log("No se devolvió nada");
        return "No hay link papi";
    }
    response.data.pipe(stream);
    await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
    console.log("Descarga completa");
};
const downloadWithFallback = async () => {
    for (const gateway of gateways) {
        try {
            const response = await axios.get(`${gateway}/ipfs/${cid}`, {
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br'
                },
                timeout: 20000
            });
            return response;
        }
        catch (error) {
            console.log(`gateway ${gateway} fallo, cambiando de gateway...`);
        }
    }
    throw new Error('Todos los gateways fallaron');
};
