const express = require("express");
const route = express.Router();

const getEditor = require("../controller/getEditor.controller");
route.get("/", getEditor.loadEditor);
route.get('/Review/:id', getEditor.reviewPost);

module.exports = route;