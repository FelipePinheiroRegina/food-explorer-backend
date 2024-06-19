const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controller/DishesController')
const dishesController = new DishesController()

const ensureAuth = require('../middlewares/ensureAuth')

const uploadConfig = require('../configs/uploads')
const multer = require('multer')
const upload = multer(uploadConfig.MULTER)

dishesRoutes.post('/', ensureAuth, upload.single("image"), dishesController.create)

module.exports = dishesRoutes