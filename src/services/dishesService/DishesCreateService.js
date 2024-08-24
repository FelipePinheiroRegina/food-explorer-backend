const AppError = require('../../utils/AppError')
const DiskStorage = require('../../providers/DiskStorage')

const { format } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');

class DishesCreateService {
    constructor(dishesRepository, ingredientsRepository) {
        this.dishesRepository      = dishesRepository
        this.ingredientsRepository = ingredientsRepository
    }

    async execute({ name, description, price, category, ingredients }, dishFileName) {
        // Obtém a data e hora atual em UTC
        const now = new Date();

        // Converte para o fuso horário de Brasília
        const brazilianTimeZone = 'America/Sao_Paulo'
        const dateHoursBrazilia = toZonedTime(now, brazilianTimeZone)

        // Formata para o formato desejado para inserção no banco de dados (YYYY-MM-DD HH:mm:ss)
        const dateFormated = format(dateHoursBrazilia, 'yyyy-MM-dd HH:mm:ss')

        const [ dishExists ] = await this.dishesRepository.findByName(name)
    
        if(dishExists) {
            throw new AppError('Dish already exists')
        }
        
        const diskStorage = new DiskStorage()
        const image = await diskStorage.saveFile(dishFileName)

        const id_dishe = await this.dishesRepository.create({name, image, description, price, category, dateFormated})
        
        const insertIngredients = ingredients.map(name => {
            return {
                name,
                id_dishe,
                created_at: dateFormated,
                updated_at: dateFormated
            }
        })

        const successIngredients =  await this.ingredientsRepository.create(insertIngredients)

        return {id_dishe, successIngredients}
    }
}

module.exports = DishesCreateService