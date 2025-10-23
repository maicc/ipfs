import { downloadFiles } from "../services/downloadLocal.service.js";
export const downloadFilesController = async () => {
    console.log("Esta apunto de llegar la descarga");
    downloadFiles();
};
