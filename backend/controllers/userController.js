const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Deconstructing values of req.body
    const {username, email, password} = req.body

    // Validation
    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    // If a user is created, send back the user id, email, and username to know it was successful
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;


    const user = await User.findOne({email})

    // Check user and passwords match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

module.exports = {
    registerUser,
    loginUser
}