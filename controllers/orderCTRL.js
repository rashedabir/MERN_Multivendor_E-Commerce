const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const orderCTRL = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ "cart.user": req.user.id });
      res.json({
        status: "success",
        result: orders.length,
        sellerOrders: orders,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("fullName userName");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const { cart, address, phone, district, bkash, trxid } = req.body;
      if (!address || !phone || !district) {
        return res.status(400).json({ msg: "Invalid Credendials." });
      }
      const { _id, fullName, userName } = user;
      const newOrder = new Order({
        user_id: _id,
        fullName,
        userName,
        cart,
        district,
        address,
        phone,
        bkash,
        trxid,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newOrder.save();
      res.json({ msg: "Order Succes!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = orderCTRL;
