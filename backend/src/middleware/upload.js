//Pour pouvoir upload les images 
// middlewares/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Assure-toi que ce dossier existe
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '_');
    cb(null, originalName); // utilise le vrai nom nettoyé
  },
});

const upload = multer({ storage });

module.exports = upload;
