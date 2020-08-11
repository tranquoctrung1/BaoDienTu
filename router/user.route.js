const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  destination(req, file, cb) {
    cb(null, "./public/images");
  },
});
const upload = multer({ storage });

const getUser = require("../controller/getUser.controller");
router.get("/", getUser.loadUser);
router.get("/RegisterPremium/:id", getUser.loadSubscriber);
router.post("/RegisterPremium/register", getUser.registerPre);
router.get("/PremiumRenewal/:id", getUser.loadPremiumRenewals);
router.post("/PremiumRenewal/Renewals", getUser.renewals);

router.get("/updateUserInfo/:id", getUser.loadUpdateUser);
router.post(
  "/updateUserInfo/update",
  upload.single("avata"),
  getUser.updateUser
);

module.exports = router;
