const express = require("express");
const route = express.Router();

const getEditor = require("../controller/getEditor.controller");
route.get("/", getEditor.loadEditor);
route.get('/Review/:id', getEditor.reviewPost);
route.post('/themdannhan', getEditor.addTag);
route.post('/accept', getEditor.acceptPost);
route.post('/deny', getEditor.denyPost);
route.post('/addNewTag', getEditor.addNewTag);

route.post("/Review/cancelPremium", getEditor.denyPremium);
route.post("/Review/grantPremium", getEditor.updatePremium);

module.exports = route;