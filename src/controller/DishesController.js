const DiskStorage = require('../providers/DiskStorage')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
// LEMBRAR DE REFATORAR ESTE CODIGO SEPARAR O BANCO E OS SERVIÇOS DO CONTROLLER
class DishesController {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const dishFileName = request.file.filename
        const diskStorage = new DiskStorage()

        const dishAlreadyExists = await knex('dishes').where({ name })

        if(dishAlreadyExists) {
            throw new AppError('Dish already exists')
        }

        const image = await diskStorage.saveFile(dishFileName)

        /*
        const insertIngredients = ingredients.map(ingredient => {
            return {

            }
        })*/

        const id_dish = await knex('dishes').insert({ name, image, description, price, category })

        console.log(id_dish)

        return response.json('ok')
    }
}

module.exports = DishesController