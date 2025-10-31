import  {Router}  from "express";
import {uploadController} from "../controller/crustDirect.controller.js";
import { uploadKuboController } from "../controller/uploadKubo.controller.js";
import { uploadSingle } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/uploadCrustDirect",uploadSingle, uploadController);
router.post("/uploadKubo", uploadKuboController)

export default router