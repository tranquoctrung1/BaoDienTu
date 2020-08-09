///
const express = require("express");
const route = express.Router();

const getLogin = require("../controller/getLogin.controller");
route.get("/", getLogin.loadlogin);
route.post("/", getLogin.postlogin);

route.get("/register", getLogin.loadregister);

route.post("/register", getLogin.postregister);

route.get("/check", getLogin.loadCheckregister);

module.exports = route;