// importing my logic service
const IngredientsIndexService = require('./IngredientsIndexService')
const IngredientsRepositoryInMemory = require('../../databaseRepositories/IngredientsRepositoryInMemory')

// creating my group of tests
describe("Ingredients Index Service", () => {
    // declaring my variables of all tests
    let ingredientsRepositoryInMemory = null
    let ingredientsIndexService = null
    
    // for each test, create a new instance
    beforeEach(() => {
        ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
        ingredientsIndexService = new  IngredientsIndexService(ingredientsRepositoryInMemory)
    })

    it("Check Find Ingredients By Id Of The Dish", async () => {
        // executing my logic of the find ingredients with id of the dish
        const ingredients = await ingredientsIndexService.execute(4)
        
        // I hope it contains an array with objects inside which in turn has properties like id, name, id_dish
        expect(ingredients).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                id_dish: expect.any(Number) 
              })
            ])
        )
    })
})

