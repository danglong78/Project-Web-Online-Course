// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: 'learnic-hcmus',
//     api_key: '568886686347377',
//     api_secret: 'UglHlBMANAY-hxBGuVhZd7XPpww'
// });

const util = require("util");
const path = require("path");
const multer = require("multer");
let Imgstorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/img");    },
    filename: (req, file, callback) => {

        let math = ['image/png','image/gif','image/jpeg','image/jpg'];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid.`;
            return callback(errorMess, null);
        }
        let filename = `${Date.now()}${file.originalname}`;
        callback(null, filename);
    }
});
let Videostorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/video");    },
    filename: (req, file, callback) => {

        let math = ['video/mp4','video/mov','video/wmv'];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid.`;
            return callback(errorMess, null);
        }
        let filename = `${Date.now()}${file.originalname}`;
        callback(null, filename);
    }
});
let uploadImage = multer({storage: Imgstorage}).single("image");
let uploadSingle= function (name) {
    multer({storage: storage}).single(name);
}
let UploadImgMiddleware = util.promisify(uploadImage);

module.exports = {
    UploadImgMiddleware,
    uploadSingle
};