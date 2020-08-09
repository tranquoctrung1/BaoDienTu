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

const getAdmin = require("../controller/getAdmin.controller");
router.get("/", getAdmin.loadAdmin);

router.get("/paddNewCategory", getAdmin.paddNewCategory);
router.post("/paddNewCategory/addNewCategory", getAdmin.addCategory);
router.get("/UpdateCategory/:id", getAdmin.loadUpdateCategory);
router.post("/UpdateCategory/update", getAdmin.updateCategory);
router.get("/Category_IsDel/:id", getAdmin.Category_IsDel);

router.get("/paddNewTag", getAdmin.paddNewTag);
router.post("/paddNewTag/addNewTag", getAdmin.addTag);
router.get("/UpdateTag/:id", getAdmin.loadUpdateTag);
router.post("/UpdateTag/update", getAdmin.updateTag);
router.get("/Tag_IsDel/:id", getAdmin.Tag_IsDel);

router.get("/paddNewPost", getAdmin.paddNewPost);
router.post("/paddNewPost", upload.single("Avatar"), getAdmin.addNewPost);
router.get("/UpdatePost/:id", getAdmin.loadUpdatePost);
router.post("/UpdatePost/update", getAdmin.updatePost);
router.post(
  "/UpdatePost/updateAvatar",
  upload.single("Avatar"),
  getAdmin.updateAvatar
);
router.post("/UpdatePost/del", getAdmin.DelPost);
router.get("/Post_IsDel/:id", getAdmin.Post_IsDel);
router.post("/UpdatePost/cancelPremium", getAdmin.denyPremium);
router.post("/UpdatePost/grantPremium", getAdmin.updatePremium);

router.get("/paddNewUser", getAdmin.paddNewUser);
router.post("/paddNewUser/addNewUser", getAdmin.addUser);
router.get("/UpdateUser/:id", getAdmin.loadUpdateUser);
router.post("/UpdateUser/update", getAdmin.updateUser);
router.get("/User_IsDel/:id", getAdmin.User_IsDel);
router.get("/grantAccPremium/:id", getAdmin.grantAccPremium);
router.get("/PremiumRenewal/:id", getAdmin.loadPremiumRenewals);
router.post("/PremiumRenewal/Renewals", getAdmin.renewals);

router.get("/Editor_Category/:id", getAdmin.LoadList_EditorCategory);
router.post("/Editor_Category/grant", getAdmin.editorCategory_grant);
router.get("/Editor_Category/deny/:id", getAdmin.editorCategory_deny);
router.get("/ReviewPost/:id", getAdmin.reviewPost);

router.post("/themdannhan", getAdmin._addTag);
router.post("/accept", getAdmin._acceptPost);
router.post("/deny", getAdmin._denyPost);
router.post("/addNewTag", getAdmin._addNewTag);

module.exports = router;
