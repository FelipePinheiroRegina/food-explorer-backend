// importing my logic service
const DishesCreateService = require('./DishesUpdateService')
const DishesRepositoryInMemory = require('../../databaseRepositories/DishesRepositoryInMemory')
const IngredientsRepositoryInMemory = require('../../databaseRepositories/IngredientsRepositoryInMemory')

// libs to create logic of diskStorage temp tests
const tmp = require('tmp')
const fs = require('fs')
const path = require('path')

// creating my group of tests
describe("Dishes Update Service", () => {
    // declaring my variables all tests
    let ingredientsRepositoryInMemory = null
    let dishesRepositoryInMemory = null
    let dishesUpdateService = null
    
    // for each test, create a new instance
    beforeEach(() => {
        ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
        dishesRepositoryInMemory = new DishesRepositoryInMemory()
        dishesUpdateService = new DishesCreateService(dishesRepositoryInMemory, ingredientsRepositoryInMemory)
    })

    it("Check if update successfully", async () => {
        // variables to update a dish
        const name = 'Update dish'
        const description = 'Update update update'
        const price = 20.50
        const category = 'juice'
        const ingredients = ['Up', 'To', 'Date']
        
        // Path to image exists
        const imagePath = path.join(__dirname, 'Image', 'Captura de tela 2024-07-28 092528.png')

        // storing the image in this variable
        const dishFileBuffer = fs.readFileSync(imagePath)

        // create a temp file, to mock of the diskStorage
        const tempFile = tmp.fileSync({ postfix: '.png' })
        fs.writeFileSync(tempFile.name, dishFileBuffer)

        // executing my service update dish
        const response = await dishesUpdateService.execute(1,
            { name, description, price, category, ingredients },
            tempFile.name
        )
        
        // wait a response that contain an object with properties id and array
        expect(response).toMatchObject({
            id: expect.any(Number)
        })
        tempFile.removeCallback();  // Remove file temp after test
    });
});
