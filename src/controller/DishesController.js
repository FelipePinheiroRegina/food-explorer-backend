// Lógica do banco de dados
const DishesRepository    = require('../DatabaseRepositories/DishesRepository')

// Lógica do serviço
const DishesCreateService = require('../services/DishesCreateService')
const DishesIndexService  = require('../services/DishesIndexService')
const DisheShowService    = require('../services/DishesShowService')
const DishesUpdateService = require('../services/DishesUpdateService')
const DishesDeleteService = require('../services/DishesDeleteService')

class DishesController {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const dishFileName = request.file.filename 
        
        const dishesRepository = new DishesRepository()
        const dishesCreateService = new DishesCreateService(dishesRepository)
        
        await dishesCreateService.execute({ name, description, price, category, ingredients }, dishFileName)
        
        return response.json({message: "Dish created successfully"})
    }

    async index(request, response) {
        const { name } = request.query
        
        const dishesRepository = new DishesRepository()
        const dishesIndexService = new DishesIndexService(dishesRepository)

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
        const dishFilename = request.file ? request.file.filename : null 

        const dishesRepository    = new DishesRepository()
        const dishesUpdateService = new DishesUpdateService(dishesRepository)

        const dish = await dishesUpdateService.execute(id, {name, description, price, category}, dishFilename)

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