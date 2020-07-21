const express = require('express');
const multer = require('multer');
const router = express.Router();
const writerModel = require("../model/writer.model");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)},
    destination(req, file, cb) {
      cb(null, './public/images');
    }
  
});
const upload = multer({ storage });

const getWriter = require("../controller/getWriter.controller");

router.get('/', getWriter.loadWriter);
router.post('/', upload.single("Avatar"), getWriter.postWriter);
router.get('/Edit/:id', getWriter.editWriter);

module.exports = router;
