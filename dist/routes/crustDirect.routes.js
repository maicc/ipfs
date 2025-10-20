import { Router } from "express";
import { uploadController } from "../controller/crustDirect.controller.js";
import { uploadKuboController } from "../controller/uploadKubo.controller.js";
const router = Router();
router.post("/uploadCrustDirect", uploadController);
router.post("/uploadKubo", uploadKuboController);
export default router;
