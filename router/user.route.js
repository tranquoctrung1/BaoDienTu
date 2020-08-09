const express = require('express');
const router = express.Router();


const getUser = require("../controller/getUser.controller");
router.get('/', getUser.loadUser);
router.get('/updateUserInfo/:id', getUser.loadUpdateUser);
router.post('/updateUserInfo/update', getUser.updateUser );

module.exports = router;