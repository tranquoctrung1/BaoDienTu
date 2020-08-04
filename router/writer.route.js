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
router.get('/Edit_baivietbituchoi/:id', getWriter.editWriter_baivietbituchoi);
router.post('/updateAvatar', upload.single("Avatar"), getWriter.updateAvatar);
router.post('/del', getWriter.DelPost);
router.post('/update', getWriter.UpdatePost);
router.post('/update_bituchoi', upload.single("Avatar"), getWriter.UpdatePost_bituchoi);
router.get('/AddTag/:id', getWriter.LoadAddTag);
router.post('/addtag', getWriter.addTag);

module.exports = router;
