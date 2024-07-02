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
}

module.exports = DishesRepository