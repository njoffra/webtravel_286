const express = require('express')
const router = express.Router()
const { create, list, read, remove, edit } = require("../services/categoryService");

const { runValidation } = require("../validators/index");
const { categoryCreateValidator } = require("../validators/category");
const { requireLogin, adminMiddleware } = require('../services/auth');

router.post("/categories", categoryCreateValidator, runValidation, requireLogin, create);
router.get("/categories", list);
router.get("/categories/:categoryId", read);
router.delete("/categories/:categoryId", requireLogin, adminMiddleware, remove  );
router.put("/categories/:categoryId", edit, requireLogin);

module.exports = router;