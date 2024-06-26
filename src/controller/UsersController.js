const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')
const UserUpdateService = require('../services/UserUpdateService')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body
        
        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({ name, email, password })
        
        return response.json('User created')
    }

    async update(request, response) {
        const { name, email, password, newPassword } = request.body
        const user_id = request.user.id

        const userRepository = new UserRepository()
        const userUpdateService = new UserUpdateService(userRepository)

        await userUpdateService.execute(user_id, { name, email, password, newPassword})

        return response.json()
    }
}

module.exports = UsersController