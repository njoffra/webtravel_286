const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('../models/category')

exports.create = (req, res) => {
  const categoryIn = req.body;
  let category = new Category(categoryIn);
  category
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.list = (req, res) => {
  Category.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      if ((err = null)) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.read = (req, res) => {
  const categoryId = req.params.categoryId;
  Category.findOne({ _id: categoryId })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: "Category not found",
        });
      }
      return res.json(data);
    })
    .catch((err) => {
      console.error("Error reading category:", err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.remove = (req, res) => {
  const categoryId = req.params.categoryId;
  Category.findOneAndDelete({ _id: categoryId })
    .then(() => {
      res.json({
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.edit = (req, res) => {
  const categoryIn = req.body;
  const categoryId = req.params.categoryId;

  Category.findOneAndUpdate({ _id: categoryId }, categoryIn, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};