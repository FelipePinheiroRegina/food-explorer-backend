const { Router } = require('express')
const usersRoutes = Router()

const UserController = require('../controller/UserController')
const userController = new UserController()

// Middlewares
const ensureAuth = require('../middlewares/ensureAuth')

usersRoutes.post('/', userController.create)
usersRoutes.put('/', ensureAuth, userController.update)

module.exports = usersRoutes
