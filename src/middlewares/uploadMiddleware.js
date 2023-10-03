const multer = require("multer");

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload= multer({storage: storage})

module.exports = {uploadSingle: upload.single('file')}