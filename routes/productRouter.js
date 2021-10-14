const productCTRL = require("../controllers/productCTRL");
const auth = require("../middleware/auth");
const authSeller = require("../middleware/authSeller");

const router = require("express").Router();

router
  .route("/product")
  .get(productCTRL.getProducts)
  .post(auth, authSeller, productCTRL.createProduct);

router
  .route("/product/:id")
  .put(auth, authSeller, productCTRL.updateProduct)
  .delete(auth, authSeller, productCTRL.deleteProduct);

module.exports = router;
