const userModel = require('../model/userModel')
const validate = require('../validate')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { error } = validate.validateUser(req.body)
        if (error) {
            res.status(409).json({
                status: 'Fail',
                message: error.details
            })
        } else {
            const exitUser = await userModel.findOne({ email: req.body.email })
            if (exitUser) {
                res.json({ message: `user already exist` })
            } else {
                const saltedPassword = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, saltedPassword)

                const userData = {
                    fullName: req.body.fullName,
                    course: req.body.course,
                    duration: req.body.duration,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashedPassword
                }
                const user = await userModel.create(userData)
                if (!user) {
                    res.status(404).json({
                        status: 'fail',
                        message: 'fail to create user'
                    })
                } else {
                    res.status(201).json({
                        status: 201,
                        data: user
                    })
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


const SignIn = async (req, res) => {
    try {
        const { error } = validate.validateSignIn(req.body)
        if (error) {
            res.json({
                message: error.details[0].message
            });
        } else {
            const user = await userModel.findOne({ email: req.body.email })
            if (!user) {
                res.json({
                    message: "User not recognized!!!"
                })
            } else {
                const passwordCheck = await bcrypt.compare(req.body.password, user.password)
                if (!passwordCheck) {
                    res.json({ message: 'Invalid password' })
                } else {
                    const { password, ...info } = user._doc;
                    const token = jwt.sign(
                        {
                            _id: user._id,
                            fullName: user.fullName,
                            course: user.course,
                            duration: user.duration,
                            username: user.username,
                            email: user.email
                        },
                        // secrete
                        'mytoken',
                        // option
                        { expiresIn: '2d' }
                    )
                    res.json({
                        message: `Welcome back ${user.fullName}`,
                        data: { token }
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const allUser = async (req, res) => {
    try {
        const news = await userModel.find()
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const oneUser = async (req, res) => {
    try {
        const news = await userModel.findById(req.params.userid)
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const news = await userModel.findByIdAndUpdate(req.params.userid, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.userid)
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    createUser,
    SignIn,
    allUser,
    oneUser,
    updateUser,
    deleteUser
}






