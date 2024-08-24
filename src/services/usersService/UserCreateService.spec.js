// importing my logic of services
const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../../databaseRepositories/UserRepositoryInMemory')
const AppError = require('../../utils/AppError')

// created my group of test
describe("User Create Service", () => {
    // declaring my variables to all tests
    let userRepositoryInMemory = null
    let userCreateService = null

    // for each test, create a new instance
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })


    it("Creating user", async () => {
        // declaring one user
        const user = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }
        
        // executing my logic of creation
        const userCreated = await userCreateService.execute(user)
        
        // if return one id, it's successfully
        expect(userCreated).toHaveProperty("id")
    })

    it("Check user exists", async () => {
        // declaring my user number 1
        const user = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }

        // declaring mt user number two
        const user1 = {
            name: 'Jest',
            email: 'jest@email.com',
            password: '123'
        }

        // executing my logic, although i expect an error
        await userCreateService.execute(user)

        // expect that my message error to equal 
        expect(userCreateService.execute(user1)).rejects.toEqual(new AppError('E-mail already exists!'))
    })
})

