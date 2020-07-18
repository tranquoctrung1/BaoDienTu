const express = require("express");
const route = express.Router();

const getListPost = require("../controller/getListPost.controller");
const getSubListPost = require('../controller/getSubListPost.controller')
const getTagListPost = require('../controller/getTagListPost.controller')

route.get("/category/:id", getListPost.loadListPost);
route.get("/tag/:id", getTagListPost.loadTagList);
route.get("/subcategory/:id", getSubListPost.loadNewSubListPost);


module.exports = route;
