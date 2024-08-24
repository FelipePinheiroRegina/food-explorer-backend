class IngredientsRepositoryInMemory {
    constructor() {
        this.ingredients = [
            {
                id: 1,
                name: 'Onion',
                id_dish: 4
        
            },

            {
                id: 2,
                name: 'Tomato',
                id_dish: 4
            }
        ]
    }

    async findById(id_dish) {
        const ingredient = this.ingredients.filter(ingredient => ingredient.id_dish === id_dish)

        return ingredient
    }

    async create(ingredientsDish){
        return ingredientsDish
    }

    async delete(id) {
        return
    }

    async findByNameIngredients(name) {
        const response = this.ingredients.filter(ingredient => ingredient.name == name)

        return response
    }
}

module.exports = IngredientsRepositoryInMemory