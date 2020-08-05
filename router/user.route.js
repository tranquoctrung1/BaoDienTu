const express = require('express');
const router = express.Router();


const getUser = require("../controller/getUser.controller");
router.get('/', getUser.loadUser);
//router.get('/updateUserInfo', getUser.updateInfo);


module.exports = router;