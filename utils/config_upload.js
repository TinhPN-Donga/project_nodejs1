const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Where to store the uploaded files
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, Date.now() + fileExt); // Generate a unique filename for each upload
  },
});

const upload = multer({ storage });

module.exports = upload;