const express = require("express");
const route = express.Router();
const forgetPasswordController = require("../controller/forgetPassword.controller");

route.get("/", forgetPasswordController.loadFormForgetPassword);
route.post("/", forgetPasswordController.postFormForgetPassword);

route.get("/verify", forgetPasswordController.loadFormVerifyToken);
route.post("/verify", forgetPasswordController.postFormVerifyToken);

route.get("/updatepassword", forgetPasswordController.loadFormUpdatePassword);
route.post("/updatepassword", forgetPasswordController.postFormUpdatePassword);

module.exports = route;
