

const User = require("../models/user")
const { expressjwt: jwt } = require('express-jwt')
const jwttoken = require('jsonwebtoken')

exports.login = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }).exec().then((user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User with that username does not exist. Sign up!'
      })
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Invalid credentials'
      })
    }
    const token = jwttoken.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    const { _id, username, role } = user
    return res.json({
      token, user: { _id, username, role }, message: 'Login sucessful'
    })
  }).catch((err) => {
    if (err) {
      return res.status(400).json({
        error: 'User with that username does not exist. Sign up!'
      })
    }
  })
}

exports.register = (req, res) => {
  const { username, password } = req.body
  console.log(username, password);
  let newUser = new User({ username, password })

  newUser.save().then((success) => {
    return success && res.json({ message: 'Sign up successful' })
  }).catch((err) => res.status(400).json({ error: err }))
}

exports.requireLogin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
})

exports.edit = (req, res) => {
  const { username, password, role, status } = req.body;
  const userId = req.params.userId;

  if (req.auth.role !== 1) {
    return res.status(403).json({ error: 'Permission denied. Only admin users can edit users.' });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (username) user.username = username;
      if (password) user.password = password;
      if (role !== undefined) user.role = role;
      if (status) user.status = status;

      return user.save();
    })
    .then(() => {
      res.json({ message: 'User updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.auth._id
  User.findOne({ _id: adminUserId }).exec().then((user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Insufficient role - Access denied'
      })
    }
    req.profile = user
    next()
  }).catch((err) => {
    if (err) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
  })
}