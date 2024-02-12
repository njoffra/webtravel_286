const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  salt: String,
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

userSchema.virtual('password').set(function (password) {
  console.log(password);
  this._password = password
  this.salt = this.makeSalt()
  this.hashed_password = this.encryptPassword(password)
}).get(function () {
  return this._password
})

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  }
}

module.exports = mongoose.model('User', userSchema)