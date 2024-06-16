const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email)

        if (checkUserExists) {
            throw new AppError('E-mail already exists!')
        }

        const hashPassword = await hash(password, 8)

        await this.userRepository.create({ name, email, password: hashPassword })
    }
}

module.exports = UserCreateService