const authConfig = require('../../configs/auth')
const AppError = require('../../utils/AppError')

const { sign } = require('jsonwebtoken')
const { compare } = require('bcryptjs')

class SessionsCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(email, password) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User not found')
        }
        
        const isMatch = await compare(password, user.password)
        
        delete user.password

        if(!isMatch) {
            throw new AppError('Email or password invalid')
        }

        const { secret, expiresIn } = authConfig.jwt
        
        const token = sign({ role: user.role }, secret, {
            subject: String(user.id),
            expiresIn
        })

        return { user, token }
    }
}

module.exports = SessionsCreateService