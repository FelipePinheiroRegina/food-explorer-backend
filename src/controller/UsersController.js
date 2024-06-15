const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const { hash } = require('bcryptjs')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body
        
        const [ emailAlreadyExist ] = await knex('users').where({ email })
       
        if (emailAlreadyExist) {
            throw new AppError('E-mail already exists!')
        }

        try {
            const hashPassword = await hash(password, 8)

            await knex('users').insert({ name, email, password: hashPassword })

            return response.json('User created successfully')

        } catch (error) {
            throw new AppError(error)
        }
    }
}

module.exports = UsersController