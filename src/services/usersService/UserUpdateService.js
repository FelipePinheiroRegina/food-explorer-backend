const AppError = require('../../utils/AppError')
const { hash, compare } = require('bcryptjs')

class UserUpdateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(id, { name, email, password, newPassword }) {
        const user = await this.userRepository.findById(id)
        
        const findEmailEqualThis = await this.userRepository.findByEmail(email)

        if(findEmailEqualThis && findEmailEqualThis.id !== user.id) {
            throw new AppError('E-mail already exists')
        }

        user.name  = name  ?? user.name
        user.email = email ?? user.email

        if(password && !newPassword) {
            throw new AppError('New password required')
        }

        if(password && newPassword) {
            const thePasswordsAreEqual = await compare(password, user.password)

            if(!thePasswordsAreEqual) {
                throw new AppError('Password does not match')
            }

            user.password = await hash(newPassword, 8)
        }
        
        const response = await this.userRepository.update(id, user)

        return response
    }
}

module.exports = UserUpdateService