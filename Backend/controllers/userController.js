import User from '../models/usermodel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'

//asyncHandler is used to handle exceptions in asynchronous methods
//@desc To Auth user and get token
//@route POST /api/users/login
//access Public

export const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid username or Password")
    }
})

//asyncHandler is used to handle exceptions in asynchronous methods
//@desc To register user
//@route POST /api/users
//access Public

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User Already Exists')
    } else {
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        console.log(user);
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid User Details')
        }

    }

})

//@desc To Get User Profile
//@route GET /api/users/profile
//access Private

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(401)
        throw new Error('User Not Found')
    }
})

//@desc To Update User Profile
//@route PUT /api/users/profile
//access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        if (user.isAdmin) {
            user.isAdmin = req.body.isAdmin
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(401)
        throw new Error('User Not Found')
    }
})