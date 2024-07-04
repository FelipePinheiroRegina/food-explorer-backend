const AppError = require('../../utils/AppError')

class DisheShowService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository
    }

    async execute(id) {
        const dish = await this.dishRepository.findById(id)

        if(!dish) {
            throw new AppError('Dish not found')
        }

        return dish
    }
}

module.exports = DisheShowService