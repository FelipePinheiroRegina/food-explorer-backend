const SessionCreateService = require('../services/sessionsService/SessionsCreateService')
const UserRepository = require('../databaseRepositories/UserRepository')

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const userRepository = new UserRepository()
        const sessionCreateService = new SessionCreateService(userRepository)
        
        const { user, token } = await sessionCreateService.execute(email, password)
        
        response.cookie("token", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 60 * 60 * 1000
        })
        
        return response.json({ user })
    }
}

module.exports = SessionsController