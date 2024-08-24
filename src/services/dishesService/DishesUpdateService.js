const { format } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');

const DiskStorage = require('../../providers/DiskStorage')
const AppError = require('../../utils/AppError')

class DishesUpdateService {
    constructor(dishesRepository, ingredientsRepository) {
        this.dishesRepository      = dishesRepository
        this.ingredientsRepository = ingredientsRepository
    }

    async execute(id, { name, description, price, category, ingredients }, dishFilename) { 
        const diskStorage = new DiskStorage()
    
        const dish        = await this.dishesRepository.findById(id)
        const oldIngredients = await this.ingredientsRepository.findById(id)
        
        if (!dish) {
            throw new AppError('Dish not found')
        }
        
        // Verifica se existe imagem para alterar
        if (dish.image && dishFilename) {
            await diskStorage.deleteFile(dish.image)
        }

        // Salva o novo arquivo enviado e atualiza o nome da imagem do prato
        if (dishFilename) {
            const filename = await diskStorage.saveFile(dishFilename)
            dish.image = filename
        }
        
        // Obtém a data e hora atual em UTC
        const now = new Date();

        // Converte para o fuso horário de Brasília
        const brazilianTimeZone = 'America/Sao_Paulo'
        const dateHoursBrazilia = toZonedTime(now, brazilianTimeZone)

        // Formata para o formato desejado para inserção no banco de dados (YYYY-MM-DD HH:mm:ss)
        const dateFormatted = format(dateHoursBrazilia, 'yyyy-MM-dd HH:mm:ss')

        // Atualiza os demais campos do prato
        dish.name        = name        ?? dish.name
        dish.description = description ?? dish.description
        dish.price       = price       ?? dish.price
        dish.category    = category    ?? dish.category
        dish.updated_at  = dateFormatted

        // Executa a atualização no banco de dados
        await this.dishesRepository.update(id, dish)

        // Se existir novos ingredientes
        if(ingredients != undefined) {

            // Se já existir ingredientes, apague.
            if(oldIngredients.length > 0) {
                oldIngredients.forEach(async ingredient => {
                    await this.ingredientsRepository.delete(ingredient.id)
                })
            }

            ingredients =  Array.isArray(ingredients) ? ingredients : Array(ingredients) 

            const insertIngredients = ingredients.map(name => {
                return {
                    name,
                    id_dishe: id,
                    updated_at: dateFormatted
                }
            })
    
            await this.ingredientsRepository.create(insertIngredients)
        }
        
        // Retorna o prato atualizado como resposta
        return dish
    }
}

module.exports = DishesUpdateService 