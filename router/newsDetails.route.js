const getNewsDetails = require("../controller/getNewsDetails.controller");
route.get("/", getNewsDetails.loadnewsDetails);
