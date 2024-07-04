const { Router } = require('express')
const ingredientsRoutes = Router()

const IngredientsController = require('../controller/IngredientsController')
const ingredientsController = new IngredientsController()

ingredientsRoutes.get('/:id', ingredientsController.index)

module.exports = ingredientsRoutes