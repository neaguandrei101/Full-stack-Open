const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../utils/helper')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if( username.length < 3 || password.length < 3) {
        return response.status(400).json({error: 'username and password must be at least 3 characters long'})
    }

    const users = await helper.usersInDb()
    const uniqueUser = users.filter(user => user.username === username)
    if(users.filter(user => user.username === username).length > 0) {
        return response.status(400).json({error: 'username must be unique'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
   const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter