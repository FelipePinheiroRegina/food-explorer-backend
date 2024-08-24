// database logic
const DishesRepository      = require('../databaseRepositories/DishesRepository')
const IngredientsRepository = require('../databaseRepositories/IngredientsRepository')

// service logic
const DishesCreateService = require('../services/dishesService/DishesCreateService')
const DishesIndexService  = require('../services/dishesService/DishesIndexService')
const DisheShowService    = require('../services/dishesService/DishesShowService')
const DishesUpdateService = require('../services/dishesService/DishesUpdateService')
const DishesDeleteService = require('../services/dishesService/DishesDeleteService')

class DishesController {
    async create(request, response) {
        const { name, description, price, category } = request.body
        const ingredients = JSON.parse(request.body.ingredients)
        const dishFileName = request.file.filename 
        
        const dishesRepository      = new DishesRepository()
        const ingredientsRepository = new IngredientsRepository()
        const dishesCreateService   = new DishesCreateService(dishesRepository, ingredientsRepository)
        
        await dishesCreateService.execute({ name, description, price, category, ingredients }, dishFileName)
        
        return response.json({message: "Dish created successfully"})
    }

    async index(request, response) {
        const { name } = request.query
        
        const dishesRepository      = new DishesRepository()
        const ingredientsRepository = new IngredientsRepository()
        const dishesIndexService    = new DishesIndexService(dishesRepository, ingredientsRepository)

        const dishes = await dishesIndexService.execute(name)
    
        return response.json(dishes)
    }

    async show(request, response) {
        const { id } = request.params
        
        const dishesRepository  = new DishesRepository()
        const dishesShowService = new DisheShowService(dishesRepository)

        const dish = await dishesShowService.execute(id)

        return response.json(dish)
    }

    async update(request, response) {
        const { id } = request.params
        const { name, description, price, category } = request.body
        const ingredients = JSON.parse(request.body.ingredients)
        const dishFilename = request.file ? request.file.filename : null 

        const dishesRepository      = new DishesRepository()
        const ingredientsRepository = new IngredientsRepository()
        const dishesUpdateService   = new DishesUpdateService(dishesRepository, ingredientsRepository)

        const dish = await dishesUpdateService.execute(id, {name, description, price, category, ingredients}, dishFilename)

        return response.json(dish)
    
    }   
    
    async delete(request, response) {
        const { id } = request.params
    
       const dishesRepository    = new DishesRepository()
       const dishesDeleteService = new DishesDeleteService(dishesRepository)

       await dishesDeleteService.execute(id)

       return response.status(201).json()
    }
}

module.exports = DishesController