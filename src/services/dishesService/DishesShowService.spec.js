// importing my logic service
const DishesRepositoryInMemory = require('../../databaseRepositories/DishesRepositoryInMemory')
const DisheShowService = require('./DishesShowService')

// creating my group test
describe("Dishes Show Service", () => {
    // declaring my variable to all tests
    let dishesRepositoryInMemory = null
    let dishesShowService = null
    
    // for each test, create a new instance
    beforeEach(() => {
        dishesRepositoryInMemory = new DishesRepositoryInMemory()
        dishesShowService = new DisheShowService(dishesRepositoryInMemory)
    })

    it("Check Search Dish By Id", async () => {
        // executing my show service by id
        const response = await dishesShowService.execute(2)

        // establishing the properties that wait
        const expectedDishStructure = {
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
            image: expect.any(String),
            category: expect.any(String)
        }
        
        // expect an object with properties declared
        expect.objectContaining(expectedDishStructure)
    })
})
