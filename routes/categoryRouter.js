const categoryCTRL = require("../controllers/categoryCTRL");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = require("express").Router();

router
  .route("/category")
  .get(categoryCTRL.getCategory)
  .post(auth, authAdmin, categoryCTRL.createCategory);

router
  .route("/category/:id")
  .put(auth, authAdmin, categoryCTRL.updateCategory)
  .delete(auth, authAdmin, categoryCTRL.deleteCategory);

module.exports = router;
