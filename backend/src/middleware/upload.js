//Pour pouvoir upload les images
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '_');
    cb(null, originalName); 
  },
});

const upload = multer({ storage });

module.exports = upload;
