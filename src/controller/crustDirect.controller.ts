import { Response, Request } from "express";
import { upload } from "../services/uploadCrustGateway.service.js";


export const uploadController = async (req: Request, res: Response) => {

    try {
        if (!req.file) {
            return res.status(400).json({
                sucess: false,
                message: "No se proporciono archivo"
            });

        }

        const fileInfo = {
            originalName: req.file.originalname,
            filename: req.file.filename, 
            path: req.file.path, 
            size: req.file.size, 
            mimetype: req.file.mimetype
        };

        console.log('archivo recibido', fileInfo);

        const result = await upload(fileInfo);

        if(!result || !result.cid || !result.size || !result.url){
            throw new Error ('Respuesta equivocada por parte del servicio');
        }

        return res.status(200).json({
            succes: true, 
            message: 'archivo subido exitosamente', 
            data: {
                originalName: fileInfo.originalName,
                cid: result.cid, 
                size:result.size, 
                url: result.url
            }
        });

    } catch (error: any) {
        console.log("Ocurrió un error " + error)
        res.status(500).json({
            success: false,
            error: error.message || 'Error al subir el archivo'
        })
    }
}