const cloudinary = require('cloudinary');
const multer = require('multer');
const keys = require('../config/keys');

cloudinary.config({
    cloud_name: keys.cloudinaryName,
    api_key: keys.cloudinaryApiKey,
    api_secret: keys.cloudinaryApiSecret
});

let storage = multer.diskStorage({
    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    }
  });
  
let imageFilter = (req, file, cb) => {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter});  


module.exports = { upload};
