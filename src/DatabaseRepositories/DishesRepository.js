// DATABASE LOGIC
const knex = require('../database/knex')

class DishesRepository {
    async findByAll() {
        const dishes = await knex('dishes')

        return dishes
    }

    async findByName(name) {
        const dishes = await knex('dishes').whereLike("dishes.name", `%${name}%`)

        return dishes
    }

    async findById(id) {
        const [ dish ] = await knex('dishes').where({ id })

        return dish
    }

    async findByNameIngredients(name) {
        const ingredients = knex('ingredients').whereLike("ingredients.name", `%${name}%`)

        return ingredients
    }

    async findByDishesWithIdIngredients(ingredientIds) {
        const dishes = await knex('dishes')
                .whereIn('id', function() { 
                    this.select('id_dishe')
                    .from('ingredients')
                    .whereIn('id', ingredientIds)
                })

        return dishes        
    }

    async create({ name, image, description, price, category }) {
        const [ id_dishe ] = await knex('dishes').insert({ name, image, description, price, category })

        return id_dishe  
    }

    async createIngredients(insertIngredients) {
        await knex('ingredients').insert(insertIngredients)
    }

    async update(id, dish) {
        await knex('dishes').where({ id }).update(dish)

        return true
    }
    
    async delete(id) {
        await knex('dishes').where({ id }).del()

        return true
    }
}

module.exports = DishesRepository