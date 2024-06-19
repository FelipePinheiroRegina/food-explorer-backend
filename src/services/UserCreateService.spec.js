const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
const AppError = require('../utils/AppError')

describe("User Create Service", () => {
    let userRepositoryInMemory = null
    let userCreateService = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })

    it("Creating user", async () => {
        const user = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }
    
        const userCreated = await userCreateService.execute(user)
    
        expect(userCreated).toHaveProperty("id")
    })

    it("Check user exists", async () => {
        const user = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }

        const user1 = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }

        await userCreateService.execute(user)

        expect(userCreateService.execute(user1)).rejects.toEqual(new AppError('E-mail already exists!'))
    })
})

