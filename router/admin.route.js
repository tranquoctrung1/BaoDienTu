const express = require('express');
const router = express.Router();

const getAdmin = require("../controller/getAdmin.controller");
router.get('/', getAdmin.loadAdmin);

module.exports = router;
