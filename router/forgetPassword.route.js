const express = require("express");
const route = express.Router();
const forgetPassword = require("../controller/forgetPassword.controller");

route.get("/:id", forgetPassword.loadForgetPassword);

route.post("/:id", forgetPassword.postChangePassword);

module.exports = route;
