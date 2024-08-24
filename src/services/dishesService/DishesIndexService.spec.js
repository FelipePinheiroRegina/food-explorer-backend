// importing my logic service
const IngredientsRepositoryInMemory = require('../../databaseRepositories/IngredientsRepositoryInMemory')
const DishesRepositoryInMemory = require('../../databaseRepositories/DishesRepositoryInMemory')
const DishesIndexService = require('./DishesIndexService')

// creating my group tests
describe("Dishes Index Service", () => {
    // declaring my variables to all tests
    let ingredientsRepositoryInMemory = null
    let dishesRepositoryInMemory = null
    let dishesIndexService = null
    
    // for each test, create a new instance
    beforeEach(() => {
        ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
        dishesRepositoryInMemory = new DishesRepositoryInMemory()
        dishesIndexService = new DishesIndexService(dishesRepositoryInMemory, ingredientsRepositoryInMemory)
    })

    it("Check Index All dishes", async () => {
        // Running my service to show all dishes
        const response = await dishesIndexService.execute()
        
        // establishing the properties that wait
        const expectedDishStructure = {
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
            image: expect.any(String),
            category: expect.any(String),
            updated_at: expect.any(String),
            created_at: expect.any(String)
        }
        
        // expect response to equal the properties 
        expect(response).toEqual(expect.arrayContaining([
            expect.objectContaining(expectedDishStructure)
        ]))
        
    })

    it("Check Index Name Dish", async () => {
        // running my dish index service by name
        const response = await dishesIndexService.execute('Salada')
        
        // wait that response contain array, object and several properties
        expect(response).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: 'Salada', 
                description: expect.any(String),
                price: expect.any(Number),
                image: expect.any(String),
                category: expect.any(String),
                updated_at: expect.any(String),
                created_at: expect.any(String)
            })
        ]))
        
    })

    it("Check Index Name Ingredients", async () => {
        // running my dish index service by ingredients
        const [response] = await dishesIndexService.execute('Onion')
        const ingredients = await ingredientsRepositoryInMemory.findByNameIngredients('Onion')
        
        // filter if of the ingredients array
        const ingredientIds = ingredients.map(ingredient => ingredient.id)

        // expect that response contain only ingredients with same id
        response.forEach(dish => 
            expect(ingredientIds).toContain(dish.id)
        )
    })
})
