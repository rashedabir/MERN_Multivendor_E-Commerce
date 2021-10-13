const Category = require("../models/categoryModel");

const categoryCTRL = {
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json({ categories });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ msg: "Invalid Credentials." });
      }
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ msg: "This Category Already Exists." });
      }
      const newCategory = new Category({
        name,
      });
      await newCategory.save();
      res.json({ msg: "Category Created." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ msg: "This Category Already Exists" });
      }
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Category Updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Category Deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryCTRL;
