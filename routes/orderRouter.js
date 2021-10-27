const orderCTRL = require("../controllers/orderCTRL");
const auth = require("../middleware/auth");
const authSeller = require("../middleware/authSeller");

const router = require("express").Router();

router
  .route("/order")
  .get(auth, authSeller, orderCTRL.getOrders)
  .post(auth, orderCTRL.createOrder);

router.route("/order/:id").put(auth, authSeller, orderCTRL.updateOrder);

module.exports = router;
