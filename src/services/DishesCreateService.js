const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesCreateService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository
    }

    async execute({ name, description, price, category, ingredients }, dishFileName) {
        const [ dishExists ] = await this.dishesRepository.findByName(name)

        if(dishExists) {
            throw new AppError('Dish already exists')
        }

        const diskStorage = new DiskStorage()
        const image = await diskStorage.saveFile(dishFileName)

        const id_dishe = await this.dishesRepository.create({name, image, description, price, category})

        const insertIngredients = ingredients.map(name => {
            return {
                name,
                id_dishe
            }
        })

        await this.dishesRepository.createIngredients(insertIngredients)

        return id_dishe
    }
}

module.exports = DishesCreateService