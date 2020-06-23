// const getNewsDetails = require("../controller/getNewsDetails.controller");
// route.get("/", getNewsDetails.loadnewsDetails);

const express = require('express');
const router = express.Router();

router.get("/newsDetails", (req, res) => {
    // res.render('vwNews/NewsDetails');
  
    const list = [
      { UserName: 'User Name 01', Comment: 'Comment 01' },
      { UserName: 'User Name 02', Comment: 'Comment 02' },
      { UserName: 'User Name 03', Comment: 'Comment 03' },
    ];
  
    res.render('vwNews/NewsDetails',{
        comment: list
    })
});

module.exports = router;
