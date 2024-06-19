const DiskStorage = require('../providers/DiskStorage')
const knex = require('../database/knex')
// LEMBRAR DE REFATORAR ESTE CODIGO SEPARAR O BANCO E OS SERVIÇOS DO CONTROLLER
class DishesController {
    async create(request, response) {
        const { name, description, price, category } = request.body
        const dishFileName = request.file.filename
        const diskStorage = new DiskStorage()

        const image = await diskStorage.saveFile(dishFileName)

        await knex('dishes').insert({ name, image, description, price, category })

        return response.json('ok')
    }
}

module.exports = DishesController