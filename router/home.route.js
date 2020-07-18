///
const express = require("express");
const route = express.Router();

const getHome = require("../controller/getHome.controller");
route.get("/", getHome.loadhome);

module.exports = route;