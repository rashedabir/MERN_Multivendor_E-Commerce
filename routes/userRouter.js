const userCTRL = require("../controllers/userCTRL");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/register", userCTRL.register);
router.post("/login", userCTRL.login);
router.get("/refresh_token", userCTRL.refreshToken);
router.get("/logout", userCTRL.logout);

router.get("/user_info", auth, userCTRL.getUser);

router.patch("/addcart", auth, userCTRL.addCart);

module.exports = router;
