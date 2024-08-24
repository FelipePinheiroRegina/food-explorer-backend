// importing my logic service
const SessionsCreateService = require('./SessionsCreateService')
const UserRepositoryInMemory = require('../../databaseRepositories/UserRepositoryInMemory')
const UserCreateService = require('../usersService/UserCreateService')

// creating my group of tests
describe("Session Create Service", () => {
    // declaring my variables to all tests
    let userRepositoryInMemory = null
    let sessionsCreateService = null
    let userCreateService = null

    // for each test, create a new instance
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory) 
        sessionsCreateService = new SessionsCreateService(userRepositoryInMemory)
    })

    it("Check Login Successfully", async () => {
        const user = {
            name: 'jest',
            email: 'jest@jestlog',
            password: '123'
        }

        await userCreateService.execute(user)
        // declaring my user
        const email = 'jest@jestlog'
        const password = '123'

        // executing my logic of authentication
        const sessionCreate = await sessionsCreateService.execute(email, password)
        
        // I expect an object with user and token properties
        expect(sessionCreate).toMatchObject({
            user: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
            }),
            token: expect.any(String)
        })
    })
})

