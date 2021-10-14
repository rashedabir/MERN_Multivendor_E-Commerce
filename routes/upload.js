const uploadCTRL = require("../controllers/uploadCTRL");
const auth = require("../middleware/auth");
const authSeller = require("../middleware/authSeller");

const router = require("express").Router();

router.post("/upload", auth, authSeller, uploadCTRL.uploadFile);
router.post("/destroy", auth, authSeller, uploadCTRL.deleteFile);

module.exports = router;
