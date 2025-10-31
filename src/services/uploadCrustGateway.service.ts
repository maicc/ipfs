import axios from "axios";
import FormData from 'form-data'
import fs, { unlink } from 'fs'
import { web3Auth } from "../auth/web3.auth.js";

export const upload = async (fileInfo: any) => {
    try {
        console.log('llego aquí')
        const auth = await web3Auth();
        const authHeader = Buffer.from(auth.auth).toString('base64');
        const ipfsW3GW = 'https://gw.crustfiles.app';

        const stream = fs.createReadStream(fileInfo.path);
        const formData = new FormData();
        formData.append('file', stream, {
            filename: fileInfo.originalName,
            contentType: fileInfo.mimetype
        });

        const response = await axios.post(`${ipfsW3GW}/api/v0/add`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Basic ${authHeader}`
                },
                timeout: 300000,
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            })
        console.log(auth.address)
        console.log('Archivo subido con ethereum')
        console.log(`Respuesta de crust`, response.data)

        await fs.promises.unlink(fileInfo.path);

        return {
            cid: response.data.Hash || response.data.cid, 
            size: response.data.size || fileInfo.size,
            url: `https://ipfs.io/ipfs/${response.data.Hash || response.data.cid}`
        }
    } catch (error) {
        console.log('Ocurrio un error al subir el archivo en el service', error);
    }
}

