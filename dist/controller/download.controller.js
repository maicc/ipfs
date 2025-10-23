import { downloadFiles } from "../services/downloadFiles.service.js";
export const downloadFilesController = async () => {
    console.log("Esta apunto de llegar la descarga");
    downloadFiles();
};
