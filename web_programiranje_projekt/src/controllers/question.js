
const express = require('express');
const router = express.Router();
const {create, list, read, remove, edit } = require('../services/questionService')

const {runValidation } = require('../validators/index');
const {travelCreateValidator} = require('../validators/travel');
const {requireLogin, adminMiddleware } = require('../services/auth')

router.post("/questions", travelCreateValidator, runValidation, requireLogin, create);
router.get("/questions", list);
router.get("/questions/:questionId", read);
router.delete("/questions/:questionId", remove, requireLogin, adminMiddleware);
router.put("/questions/:questionId", edit, requireLogin, adminMiddleware);

module.exports = router;
