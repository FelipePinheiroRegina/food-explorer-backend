const DiskStorage = require('../../providers/DiskStorage')
const AppError = require('../../utils/AppError')

class DishesDeleteService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository
    }

    async execute(id) {
        const dish = await this.dishesRepository.findById(id)

        if (!dish) {
            throw new AppError('Dish not found')
        }

        const diskStorage = new DiskStorage()
        diskStorage.deleteFile(dish.image)
        
        await this.dishesRepository.delete(id)
    
        return true
    }
}

module.exports = DishesDeleteService