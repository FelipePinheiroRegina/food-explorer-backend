// importing my logic service
const DishesCreateService = require('./DishesCreateService')
const DishesRepositoryInMemory = require('../../databaseRepositories/DishesRepositoryInMemory')
const IngredientsRepositoryInMemory = require('../../databaseRepositories/IngredientsRepositoryInMemory')

// libs to create logic of diskStorage temp tests
const tmp = require('tmp')
const fs = require('fs')
const path = require('path')

// creating my group of tests
describe("Dishes Create Service", () => {
    // declaring my variables all tests
    let ingredientsRepositoryInMemory = null
    let dishesRepositoryInMemory = null
    let dishesCreateService = null
    
    // for each test, create a new instance
    beforeEach(() => {
        ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
        dishesRepositoryInMemory = new DishesRepositoryInMemory()
        dishesCreateService = new DishesCreateService(dishesRepositoryInMemory, ingredientsRepositoryInMemory)
    })

    it("Check if create successfully", async () => {
        // variables to create a dish
        const name = 'Salada de tomate'
        const description = 'Salada Saudável'
        const price = 20.50
        const category = 'meal'
        const ingredients = ['Alface', 'Tomate', 'Cebola']
        
        // Path to image exists
        const imagePath = path.join(__dirname, 'Image', 'Captura de tela 2024-07-28 092528.png')

        // storing the image in this variable
        const dishFileBuffer = fs.readFileSync(imagePath)

        // create a temp file, to mock of the diskStorage
        const tempFile = tmp.fileSync({ postfix: '.png' })
        fs.writeFileSync(tempFile.name, dishFileBuffer)

        // executing my service create new dish
        const response = await dishesCreateService.execute(
            { name, description, price, category, ingredients },
            tempFile.name
        )
        
        // wait a response that contain an object with properties id and array
        expect(response).toMatchObject({
            id_dishe: expect.any(Number),
            successIngredients: expect.any(Array)
        })
        tempFile.removeCallback();  // Remove file temp after test
    });
});
