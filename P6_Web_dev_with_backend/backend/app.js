const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')

const app = express()

// Mongoose Auth
try {
  mongoose.connect(process.env.DB_CONNECT_STR).then(() => {
    console.log('Successfully connected to MongoDB Atlas!')
  })
} catch (error) {
  console.log('Unable to connect to MongoDB Atlas!')
  console.error(error)
}

app.use(express.json())

// all types of access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// setting up a middleware
app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
