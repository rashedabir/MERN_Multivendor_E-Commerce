const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    product_id: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    shopName: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
