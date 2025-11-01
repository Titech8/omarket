import multer from "multer";
import path from "path";
import fs from "fs";


//dossier ou les images seront stockées
const uploadDir = path.join(process.cwd(), "src", "uploads");

//créer le dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

//configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadDir);
    },
    filename:(req, file, cb) =>{
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});


//filtrer les types de fichiers(seulement images)
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Format d'image non suporté"), false);
    }
};

//exporter le middleware d'upload
const upload = multer({storage, fileFilter});

export default upload;