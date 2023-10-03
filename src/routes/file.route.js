const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const {uploadSingle} = require("../middlewares/uploadMiddleware")


router.post('/upload', uploadSingle, fileController.uploadFile);
module.exports = router