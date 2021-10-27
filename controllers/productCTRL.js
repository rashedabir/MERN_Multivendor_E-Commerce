const Product = require("../models/productModel");
const User = require("../models/userModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCTRL = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, title, price, category, description, images } =
        req.body;
      if (!product_id || !title || !price || !category || !description) {
        return res.status(400).json({ msg: "Invalid Product Credentials." });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Images is Selected." });
      }
      const existingProduct = await Product.findOne({ product_id });
      if (existingProduct) {
        return res.status(400).json({ msg: "This Product id Already Exists." });
      }
      const user = req.user.id;
      const seller = await User.findOne({ _id: user });
      const newProduct = new Product({
        user: user,
        product_id,
        title,
        price,
        description,
        shopName: seller.shopName,
        images,
        category,
      });
      await newProduct.save();
      res.json({ msg: "Created a Product." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, images, category } = req.body;
      if (!title || !price || !description || !category) {
        return res.status(400).json({ msg: "Invalid Product Credentials." });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Images is Selected." });
      }
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(400).json({ msg: "Product Not Found." });
      }
      if (product.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "Not Authorized." });
      }
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        { title, price, description, images, category }
      );
      res.json({ msg: "Product is Updated." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(400).json({ msg: "Product Not Found." });
      }
      if (product.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "Not Authorized." });
      }
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product Deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  reviewProduct: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      if (!rating || !comment) {
        return res.status(400).json({ msg: "Invalid Comment." });
      }
      if (comment.length < 3) {
        return res.status(400).json({ msg: "Comment Must be 3 Lengths Long." });
      }
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(400).json({ msg: "Product Not Found." });
      }
      const user = req.user.id;
      const author = await User.findOne({ _id: user });
      product.comments.push({
        rating,
        comment,
        author: author.fullName,
      });
      product.save();
      res.json({ msg: "Successfully Commented." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  sellerProduct: async (req, res) => {
    try {
      const products = await Product.find({ user: req.user.id });
      res.json({
        status: "success",
        result: products.length,
        sellerProducts: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getShop: async (req, res) => {
    try {
      const shops = await User.find({ role: "seller" }).select("-password");
      res.json({ status: "success", result: shops.length, shops: shops });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getShopDetails: async (req, res) => {
    try {
      const products = await Product.find({ user: req.params.id });
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCTRL;
