const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')


class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body
        
        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({ name, email, password })
        
        return response.json('User created')
    }

    async update(request, response) {
        return response.json('Você passou pelo middleware')
    }
}

module.exports = UsersController