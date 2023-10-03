const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const File = require("../models/file.model")
const User = require('../models/user.model');

const uploadFile = async(req, res) => {
  if(!req.file){
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  const userId = req.user.id;
  const modifiedFileName = `${userId}-${req.file.originalname}`;
  const modifiedFilePath = `uploads/${modifiedFileName}`;
  const file = new File({
    originalname: req.file.originalname,
    filename: modifiedFileName,
    path: modifiedFilePath
});

file.save()
    .then((savedFile) => {
    User.findByIdAndUpdate(userId, { $push: { uploadedFiles: savedFile._id } })
        .then(() => {
          res.status(200).json({ message: 'File uploaded successfully' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to associate file with user' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to upload file' });
    });
};
 
module.exports = {uploadFile}