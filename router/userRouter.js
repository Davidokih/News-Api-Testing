const express = require('express')
const userRouter = express.Router()

const { createUser,
    SignIn,
    allUser,
    oneUser,
    updateUser,
    deleteUser } = require('../handler/userHandler')

userRouter.post('/user', createUser)
userRouter.post('/user', SignIn)
userRouter.get('/user', allUser)
userRouter.get('/user/:userid', oneUser)
userRouter.patch('/user/:userid', updateUser)
userRouter.delete('/user/:userid', deleteUser)

module.exports = userRouter