// DATABASE LOGIC
const knex = require('../database/knex')

class DishesRepository {
    async findByName(name) {
        const [ dish ] = await knex('dishes').where({ name })

        return dish
    }

    async create({ name, image, description, price, category }) {
        const [ id_dishe ] = await knex('dishes').insert({ name, image, description, price, category })

        return id_dishe  
    }

    async createIngredients(insertIngredients) {
        await knex('ingredients').insert(insertIngredients)
    }

    async searchDishes(name) {
        const dishes = await knex('dishes').whereLike("dishes.name", `%${name}%`)

        return dishes
    }

    async searchIngredients(name) {
        const ingredients = knex('ingredients').whereLike("ingredients.name", `%${name}%`)

        return ingredients
    }

    async searchDishesWhatContainThisIngredients(ingredientIds) {
        const dishes = await knex('dishes')
                .whereIn('id', function() { 
                    this.select('id_dishe')
                    .from('ingredients')
                    .whereIn('id', ingredientIds)
                })

        return dishes        
    }
}

module.exports = DishesRepository