import { upload } from "./services/uploadCrustGateway.service.js";
const subirArchivo = async (archivo) => {
    const cid = await upload(archivo);
};
subirArchivo("F:/Documentos/Anime/Monogatari Series/01. Bakemonogatari/Bakemonogatari 01 - Hitagi Crab, Part 1.mkv");
