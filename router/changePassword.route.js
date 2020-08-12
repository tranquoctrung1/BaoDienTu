const express = require("express");
const route = express.Router();
const changePassword = require("../controller/changePassword.controller");

route.get("/:id", changePassword.loadChangePassword);

route.post("/:id", changePassword.postChangePassword);

module.exports = route;
