import { downloadFilesService } from "../services/downloadFiles.service.js"
import { Request, Response } from "express";

export const downloadFilesController = async(req:Request, res: Response)=>{

    const {cid} = req.body
    if(!cid){
       return res.status(400).json("No puede dejar el espacio vació")
    }
    const links = await downloadFilesService(cid);
    console.log(JSON.stringify(links, null, 2))
    res.status(200).json(links)
}