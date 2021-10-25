const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    district: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    bkash: {
      type: String,
    },
    trxid: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
