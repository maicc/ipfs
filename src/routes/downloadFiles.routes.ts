import { Router } from "express";
import { downloadFilesController } from "../controller/downloadfiles.controller.js";
const router = Router();

router.post("/downloadFiles", downloadFilesController)

export default router;