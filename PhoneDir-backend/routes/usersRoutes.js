const express = require("express");
const { checkLogin, createNewUser } = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(createNewUser);
router.route("/login").post(checkLogin);

module.exports = router;
