const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controller/DishesController')
const dishesController = new DishesController()

const ensureAuth = require('../middlewares/ensureAuth')

const uploadConfig = require('../configs/uploads')
const multer = require('multer')
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuth)

dishesRoutes.post('/', upload.single("image"), dishesController.create)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

module.exports = dishesRoutes