const express = require('express')
const router = express.Router()
const {register, login, edit, adminMiddleware, requireLogin} = require('../services/auth')

router.post('/auth/register', register)
router.post('/auth/login', login)
router.put("/auth/:userId",adminMiddleware, edit );
module.exports = router;