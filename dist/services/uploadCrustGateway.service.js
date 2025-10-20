import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import { web3Auth } from "../auth/web3.auth.js";
export const upload = async (fileContent) => {
    const auth = await web3Auth();
    const authHeader = Buffer.from(auth.auth).toString('base64');
    const ipfsW3GW = 'https://gw.crustfiles.app';
    const form = new FormData();
    const stream = fs.createReadStream(fileContent);
    form.append('file', stream);
    const response = await axios.post(`${ipfsW3GW}/api/v0/add`, form, {
        headers: {
            'Authorization': `Basic ${authHeader}`,
            ...form.getHeaders()
        },
        timeout: 300000
    });
    console.log(auth.address);
    console.log('Archivo subido con ethereum');
    console.log(`CID ${response.data.Hash}`);
    return response.data.Hash;
};
