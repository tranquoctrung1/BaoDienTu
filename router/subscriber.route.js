const express = require("express");
const route = express.Router();

const getSubscriber = require("../controller/getSubscriber.controller");
route.get("/", getSubscriber.loadSubscriber);
route.post("/registerPremium", getSubscriber.registerPre);

module.exports = route;
