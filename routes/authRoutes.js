const express = require("express");

const router = express.Router();

const {
  signupPage,
  signinPage,
  signup,
  signin,
} = require("../controllers/auth");

router.get("/signup", signupPage);
router.get("/signin", signinPage);
router.post("/signup-user", signup);
router.post("/signin-user", signin);

module.exports = router;
