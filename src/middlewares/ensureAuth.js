const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuth(request, response, next) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError('JWT token invalid')
    }

    const [ , token ] = authHeader.split(' ')
    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()

    } catch (error) {
        throw new AppError('JWT token invalid')
    }
}

module.exports = ensureAuth