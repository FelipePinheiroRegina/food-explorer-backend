// DATABASE LOGIC
const knex = require('../database/knex')

class IngredientsRepository {
    async findById(id_dishe) {
        const ingredients = await knex('ingredients').where({ id_dishe })

        return ingredients
    }

    async findByNameIngredients(name) {
        const ingredients = knex('ingredients').whereLike("ingredients.name", `%${name}%`)

        return ingredients
    }

    async create(insertIngredients) {
        await knex('ingredients').insert(insertIngredients)
    }

    async update(id, ingredient) {
        await knex('ingredients').where({ id }).update({name: ingredient})
    }

    async delete(id) {
        await knex('ingredients').where({ id }).del()
    }
}

module.exports = IngredientsRepository