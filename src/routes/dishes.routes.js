const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controller/DishesController')
const dishesController = new DishesController()

const ensureAuth = require('../middlewares/ensureAuth')

const uploadConfig = require('../configs/uploads')
const multer = require('multer')
const { update } = require('../database/knex')
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuth)

dishesRoutes.post('/', upload.single("image"), dishesController.create)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

dishesRoutes.put('/:id', upload.single("image"), dishesController.update)

dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes