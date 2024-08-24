const IngredientsRepository = require('../Repositories/IngredientsRepository')

const IngredientsIndexService = require('../services/ingredientsService/IngredientsIndexService')

class IngredientsController {
    async index(request, response) {
        const { id } = request.params

        const ingredientsRepository = new IngredientsRepository()
        const ingredientsIndexService = new IngredientsIndexService(ingredientsRepository)

        const ingredients = await ingredientsIndexService.execute(id)

        return response.json(ingredients)
    }
}

module.exports = IngredientsController