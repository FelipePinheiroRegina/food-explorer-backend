const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controller/DishesController')
const dishesController = new DishesController()

const ensureAuth = require('../middlewares/ensureAuth')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const uploadConfig = require('../configs/uploads')
const multer = require('multer')
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuth)

// If I want to add another role to verifyUserAuthorization, I must pass an array with authorized roles ex.: verifyUserAuthorization(["admin", "sale"])
dishesRoutes.post('/', verifyUserAuthorization("admin"), upload.single("image"), dishesController.create)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

dishesRoutes.put('/:id', verifyUserAuthorization("admin"), upload.single("image"), dishesController.update)

dishesRoutes.delete('/:id', verifyUserAuthorization("admin"), dishesController.delete)

module.exports = dishesRoutes