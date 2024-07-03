class DishesIndexService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository
    }

    async execute(name) {

        let dishes = []
    
        if (name) {
            dishes = await this.dishesRepository.searchDishes(name)
    
            if (dishes.length === 0) {
                const ingredients = await this.dishesRepository.searchIngredients(name)
    
                if (ingredients.length > 0) {
                    const ingredientIds = ingredients.map(ingredient => ingredient.id)
    
                    dishes = await this.dishesRepository.searchDishesWhatContainThisIngredients(ingredientIds)
                }     
            }
                  
        }
    
        return dishes
    } 
    
}

module.exports = DishesIndexService