const express = require('express');
const router = express.Router();
const {create, list, read, remove, edit } = require('../services/travelService')


const {runValidation } = require('../validators/index');
const {travelCreateValidator} = require('../validators/travel');
const {requireLogin, adminMiddleware } = require('../services/auth')

router.post("/travels", travelCreateValidator, runValidation, requireLogin, create);
router.get("/travels", list);
router.get("/travels/:travelId", read);
router.delete("/travels/:travelId", remove, requireLogin, adminMiddleware);
router.put("/travels/:travelId", edit, requireLogin, adminMiddleware);

module.exports = router;