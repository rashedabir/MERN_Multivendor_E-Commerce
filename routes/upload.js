const uploadCTRL = require("../controllers/uploadCTRL");
const auth = require("../middleware/auth");
const authSeller = require("../middleware/authSeller");

const router = require("express").Router();

router.post("/upload", auth, uploadCTRL.uploadFile);
router.post("/destroy", auth, uploadCTRL.deleteFile);

module.exports = router;
