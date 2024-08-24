// DATABASE LOGIC
const knex = require('../database/knex')

class UserRepository {
    async findByEmail(email) {
       
        const [ user ] = await knex('users').where({ email })

        return user
    }

    async findById(id) {
        const [ user ] = await knex('users').where({id})

        return user
    }

    async create({ name, email, password }) {
        const userId = await knex('users').insert({ name, email, password })

        return {id: userId}     
    }

    async update(id, user) {
        await knex('users').update(user).where({ id })
    }
}

module.exports = UserRepository