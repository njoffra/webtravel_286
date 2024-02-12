const { check } = require('express-validator')

exports.categoryCreateValidator = [
  check('name').notEmpty().withMessage('Category name is required')
    .isLength({ max: 255 })
    .withMessage("Category name must be 255 characters max")
]