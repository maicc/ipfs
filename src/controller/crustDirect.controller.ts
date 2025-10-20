import { Response, Request } from "express";
import { upload } from "../services/uploadCrustGateway.service.js";

export const uploadController = async (req: Request, res: Response) => {

    try {
        const {file} = req.body
        if (!file) {
            return res.status(400).json({
                sucess: false,
                message: "No se proporciono archivo"
            });

        }
        const cid = await upload(file);

        return res.status(200).json({
            succes: true, 
            data: cid ,
            link: `https://ipfs.io/ipfs/${cid}`
        })

    } catch (error: any) {
        console.log("Ocurrió un error " + error)
    }
}