const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const User = require('./src/models/user');
const Travel = require('./src/models/travel');
const Question = require('./src/models/question')
const Category = require('./src/models/category')
const authRoutes = require('./src/controllers/auth');
const categoryRoutes = require("./src/controllers/category");
const travelRoutes = require("./src/controllers/travel");
const viewController = require('./src/controllers/views');
const path = require('path');

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, 'frontend')));
mongoose.connect(process.env.DATABASE_ATLAS)
  .then(() => console.log('Database connected!')).catch(err => console.log(err))

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

async function initializeDatabase() {
  try {
    
    // await User.createCollection();
    // await Travel.createCollection();
    // await Question.createCollection();
    // await Category.createCollection();

    // await User.create({ username: 'admin', password: 'hashed_password', role: 1 });
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
initializeDatabase();
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", travelRoutes);
app.get('/login', viewController.getLoginPage);
app.get('/register', viewController.getRegisterPage);
app.get('/index', viewController.getIndexPage);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})