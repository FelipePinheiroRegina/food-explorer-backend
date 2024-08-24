// importing my logic service
const UserCreateService = require('./UserCreateService')
const UserUpdateService = require('./UserUpdateService')
const UserRepositoryInMemory = require('../../databaseRepositories/UserRepositoryInMemory')

// declaring my group of tests
describe("User Update Service", () => {
    // declaring my variables to all tests
    let userRepositoryInMemory = null
    let userCreateService = null
    let userUpdateService = null

    // for each test, create a new instance
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
        userUpdateService = new UserUpdateService(userRepositoryInMemory)
    })

    it("Check User Update Successfully", async () => {
        // declaring my user without update
        const user = {
            name: 'jest',
            email: 'jest@jest',
            password: '123'
        }

        // executing my service of create user
        const userCreated = await userCreateService.execute(user)
        
        // declaring my variables with values of update
        const name = 'jestUpdate'
        const email = 'jest@update'
        const password = '123' 
        const newPassword = '123456'
        
        // executing my service of update user
        const userUpdate = await userUpdateService.execute(userCreated.id, { name, email, password, newPassword})
        
        // check if the initial name and email is not the same as the one that was modified
        function testUpdate() {
            if(user.name != userUpdate.name && user.email != userUpdate.email){
                return true
            } else {
                return false
            }
        }
        
        expect(testUpdate()).toEqual(true)
    })
})

