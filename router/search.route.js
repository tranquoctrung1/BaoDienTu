const express = require("express");
const router = express.Router();

const getSearch = require("../controller/searchNew.controller");
router.get("/", getSearch.loadSearch);

module.exports = router;
