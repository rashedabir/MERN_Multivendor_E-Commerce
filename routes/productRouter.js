const productCTRL = require("../controllers/productCTRL");
const auth = require("../middleware/auth");
const authSeller = require("../middleware/authSeller");

const router = require("express").Router();

router
  .route("/products")
  .get(productCTRL.getProducts)
  .post(auth, authSeller, productCTRL.createProduct);

router.route("/shops").get(productCTRL.getShop);

router.route("/shops/:id").get(productCTRL.getShopDetails);

router
  .route("/product/:id")
  .put(auth, authSeller, productCTRL.updateProduct)
  .delete(auth, authSeller, productCTRL.deleteProduct);

router.route("/review/:id").post(auth, productCTRL.reviewProduct);

router
  .route("/seller_product")
  .get(auth, authSeller, productCTRL.sellerProduct);

module.exports = router;
