const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000

const app = express()

// This allows us to accept raw json
app.use(express.json())
// Same as above but with url encoded
app.use(express.urlencoded({ extended: false }))


// Welcome Response (Not necessary)
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Cakeymat API'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))


// Using the error handler in middleware
app.use(errorHandler)

// What port the server starts on
// app.listen(Port #, anon function)
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})