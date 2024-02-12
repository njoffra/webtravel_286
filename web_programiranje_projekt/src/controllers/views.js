const path = require('path');

exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../views', 'login.html'));
};


exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../views', 'register.html'));
};

exports.getIndexPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../views', 'index.html'));
};