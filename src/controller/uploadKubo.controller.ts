import { Response, Request } from "express";
import { uploadKubo } from "../services/uploadKubo.service.js";

export const uploadKuboController = async (req: Request, res: Response) => {

    try {
        const {file} = req.body
        if (!file) {
            return res.status(400).json({
                sucess: false,
                message: "No se proporciono archivo"
            });

        }
        const cid = await uploadKubo(file);

        return res.status(200).json({
            succes: true, 
            data: cid ,
            link: `https://ipfs.io/ipfs/${cid}`
        })

    } catch (error: any) {
        console.log("Ocurrió un error " + error)
    }
}