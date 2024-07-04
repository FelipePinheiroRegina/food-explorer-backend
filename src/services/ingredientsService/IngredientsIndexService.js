const AppError = require("../../utils/AppError")

class IngredientsIndexService {
    constructor(ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository
    }

    async execute(id) {
        const ingredients = await this.ingredientsRepository.findById(id)

        if(ingredients.length == 0) {
            throw new AppError('Ingredients not found')
        }

        return ingredients
            
    }
}

module.exports = IngredientsIndexService