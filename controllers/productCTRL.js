const Product = require("../models/productModel");

const productCTRL = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ products });
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
      const newProduct = new Product({
        user: req.user.id,
        product_id,
        title,
        price,
        description,
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
};

module.exports = productCTRL;
