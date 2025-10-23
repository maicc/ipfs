import { Router } from "express";
import { downloadFilesController } from "../controller/downloadLocal.controller.js";

const router = Router();

router.get('/downloadFile', downloadFilesController)

export default router