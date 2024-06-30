const DiskStorage = require('../providers/DiskStorage')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
// LEMBRAR DE REFATORAR ESTE CODIGO SEPARAR O BANCO E OS SERVIÇOS DO CONTROLLER
class DishesController {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const dishFileName = request.file.filename
    
        const [ dishExists ] = await knex('dishes').where({ name })

        if(dishExists) {
            throw new AppError('Dish already exists')
        }

        const diskStorage = new DiskStorage()

        const image = await diskStorage.saveFile(dishFileName)

        const [ id_dishe ] = await knex('dishes').insert({ name, image, description, price, category })
        
        const insertIngredients = ingredients.map(name => {
            console.log( id_dishe, name)
            return {
                name,
                id_dishe
            }
        })

        await knex('ingredients').insert(insertIngredients)
        
        return response.json({msg: 'Dish create successfully'})
    }

    async index(request, response) {
        const { name } = request.query
    
        let dishes = []
    
        if (name) {
            dishes = await knex('dishes').whereLike("dishes.name", `%${name}%`)
    
            if (dishes.length === 0) {
                const ingredients = await knex('ingredients').whereLike("ingredients.name", `%${name}%`);
    
                if (ingredients.length > 0) {
                    const ingredientIds = ingredients.map(ingredient => ingredient.id);
    
                    dishes = await knex('dishes')
                        .whereIn('id', function() {
                            this.select('id_dishe').from('ingredients')
                                .whereIn('id', ingredientIds);
                        });
    
                }     
            }
                  
        }
    
        return response.json(dishes);
    }

    async show(request, response) {
        const { id } = request.params
        
        const [ dish ] = await knex('dishes').where({ id })

        if(!dish) {
            throw new AppError('Dish not found')
        }

        return response.json(dish)
    }
    
}

module.exports = DishesController