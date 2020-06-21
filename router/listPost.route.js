const getListPost = require("../controller/getListPost.controller");
route.get("/", getListPost.loadListPost);