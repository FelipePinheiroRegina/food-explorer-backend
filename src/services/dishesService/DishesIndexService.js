class DishesIndexService {
    constructor(dishesRepository, ingredientsRepository) {
        this.dishesRepository      = dishesRepository
        this.ingredientsRepository = ingredientsRepository
    }

    async execute(name) {

        let dishes
        
        if (name) {
            dishes = await this.dishesRepository.findByName(name)
    
            if (dishes.length === 0) {
                const ingredients = await this.ingredientsRepository.findByNameIngredients(name)
    
                if (ingredients.length > 0) {
                    const ingredientIds = ingredients.map(ingredient => ingredient.id)
                    
                    dishes = await this.dishesRepository.findByDishesWithIdIngredients(ingredientIds)
                }     
            }
                  
        } else {
            dishes = await this.dishesRepository.findByAll()
        }
    
        return dishes
    } 
    
}

module.exports = DishesIndexService