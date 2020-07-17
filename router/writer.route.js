const express = require('express');
// const multer = require('multer');
const router = express.Router();
const writerModel = require("../model/writer.model");

const getWriter = require("../controller/getWriter.controller");
router.get('/', getWriter.loadWriter);
router.post('/', getWriter.loadWriter);

router.post('/', async function (req, res){
    const entity = {
        NewsID: req.body.NewsID,
        NewsTitle: req.body.NewsTitle,
        Author: req.body.Author,
        DatePost: req.body.DatePost,
        CatChild_ID: req.body.CatChild_ID,
        Abstract: req.body.Abstract,
        Content: req.body.Content,
        Like,
        View,
        Status: 4,
    }

    await writerModel.addNewPost(entity);
    res.render('wWriter/Writer');
});

// router.get('/', async function (req, res) {
//   res.render('vwWriter/Writer');
// })

// router.post('/', async function (req, res) {
//   console.log(req.body.FullDes);
//   res.send('ok');
// })

// router.get('/upload', function (req, res) {
//   res.render('vwWriter/Writer');
// })

// router.post('/upload', function (req, res) {
//   //.....

//   const storage = multer.diskStorage({
//     filename(req, file, cb) {
//       cb(null, file.originalname);
//     },
//     destination(req, file, cb) {
//       cb(null, './public/images');
//     }
//   })

//   const upload = multer({ storage });
//   upload.array('fuMain', 3)(req, res, function (err) {
//     if (!err)
//       res.render('vwWriter/Writer');
//     else res.send('err');
//   })
// })

module.exports = router;
