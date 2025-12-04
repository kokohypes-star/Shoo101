const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/signup", auth.signup);
router.get("/verify", auth.verify);
router.post("/otp", auth.requestOTP);
router.post("/otp/verify", auth.verifyOTP);

module.exports = router;
