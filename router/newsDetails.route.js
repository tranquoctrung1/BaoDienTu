const express = require('express');
const router = express.Router();

const getNews = require("../controller/getNewsDetails.controller");
router.get('/:id', getNews.loadNewsDetails);

router.post('/like', getNews.patch);

module.exports = router;
