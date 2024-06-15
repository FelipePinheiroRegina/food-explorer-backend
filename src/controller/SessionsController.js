const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const [ user ] = await knex('users').where({ email })

        if (!user) {
            throw new AppError('User not found')
        }

        const isMatch = await compare(password, user.password)
    
        if(!isMatch) {
            throw new AppError('Email or password invalid')
        }

        const { secret, expiresIn } = authConfig.jwt
        
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        
        return response.json({user, token})
    }
}

module.exports = SessionsController