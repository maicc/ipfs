import multer from "multer";
import fs from 'fs';
console.log("llega acá");
const uploadsDir = './datos/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("guardado en ", uploadsDir);
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
/*
const fileFilter = (req, file, cb)=>{
    cb(null, true)
};
*/
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024
    }
});
export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 10);
export const uploadFields = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);
export default upload;
