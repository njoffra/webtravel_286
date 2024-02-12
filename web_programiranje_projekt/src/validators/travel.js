const { check } = require('express-validator')

exports.travelCreateValidator = [
  check('destination').notEmpty().withMessage('Destination name is required')
    .isLength({ max: 255 })
    .withMessage("Category name must be 255 characters max"),
    check('category').notEmpty().withMessage('Category name is required')
    .isLength({ max: 255 })
    .withMessage("Category name must be 255 characters max"),
    
]