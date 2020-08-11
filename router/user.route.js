const express = require("express");
const router = express.Router();

const getUser = require("../controller/getUser.controller");
router.get("/", getUser.loadUser);
router.get("/RegisterPremium/:id", getUser.loadSubscriber);
router.post("/RegisterPremium/register", getUser.registerPre);
router.get("/PremiumRenewal/:id", getUser.loadPremiumRenewals);
router.post("/PremiumRenewal/Renewals", getUser.renewals);

router.get("/updateUserInfo/:id", getUser.loadUpdateUser);
router.post("/updateUserInfo/update", getUser.updateUser);

module.exports = router;
