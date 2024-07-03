const { format } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');

const DishesRepository = require('../DatabaseRepositories/DishesRepository')
const DishesCreateService = require('../services/DishesCreateService')
const DishesIndexService = require('../services/DishesIndexService')

const DiskStorage = require('../providers/DiskStorage')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

// INVERTENDO AS DEPENDÊNCIAS, SEPARANDO A LÓGICA DO BANCO DE DADOS E DO CONTROLLER 

class DishesController {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const dishFileName = request.file.filename 
        
        const dishesRepository = new DishesRepository()
        const dishesCreateService = new DishesCreateService(dishesRepository)
        
        await dishesCreateService.execute({ name, description, price, category, ingredients }, dishFileName)
        
        return response.json({message: "Dish created successfully"})
    }

    async index(request, response) {
        const { name } = request.query
        
        const dishesRepository = new DishesRepository()
        const dishesIndexService = new DishesIndexService(dishesRepository)

        const dishes = await dishesIndexService.execute(name)
    
        return response.json(dishes)
    }

    async show(request, response) {
        const { id } = request.params
        
        const [ dish ] = await knex('dishes').where({ id })

        if(!dish) {
            throw new AppError('Dish not found')
        }

        return response.json(dish)
    }

    async update(request, response) {
        const user_id = request.user.id
        const { id } = request.params
        const { name, description, price, category } = request.body
        const dishFilename = request.file ? request.file.filename : null // Verifica se há arquivo enviado
    
        const diskStorage = new DiskStorage()
    
        try {
            // Verifica se o usuário está autenticado
            const user = await knex("users").where({ id: user_id }).first()
            if (!user) {
                throw new Error('Only authenticated users can change a dish')
            }
    
            // Busca o prato pelo ID
            let dish = await knex('dishes').where({ id }).first()
            if (!dish) {
                throw new Error('Dish not found')
            }
    
            // Deleta a imagem antiga se um novo arquivo foi enviado
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
            const brazilianTimeZone = 'America/Sao_Paulo';
            const dateHoursBrazilia = toZonedTime(now, brazilianTimeZone);

            // Formata para o formato desejado para inserção no banco de dados (YYYY-MM-DD HH:mm:ss)
            const dateFormated = format(dateHoursBrazilia, 'yyyy-MM-dd HH:mm:ss');

            // Atualiza os demais campos do prato
            dish.name = name ?? dish.name
            dish.description = description ?? dish.description
            dish.price = price ?? dish.price
            dish.category = category ?? dish.category
            dish.updated_at = dateFormated

            // Executa a atualização no banco de dados
            await knex('dishes').where({ id }).update(dish)
    
            // Retorna o prato atualizado como resposta
            return response.json(dish)
        } catch (error) {
            console.error('Error updating dish:', error)
            return response.status(500).json({ error: 'Error updating dish' })
        }
    }
    
    async delete(request, response) {
        const { id } = request.params
    
        try {
            // Verifica se o prato existe antes de tentar excluí-lo
            const dish = await knex('dishes').where({ id }).first()
            if (!dish) {
                return response.status(404).json({ error: 'Dish not found' })
            }
    
            // Realiza a exclusão do prato
            await knex('dishes').where({ id }).del()
    
            return response.json({ msg: 'Dish deleted successfully' })
        } catch (error) {
            console.error('Error deleting dish:', error)
            throw new AppError('Unable to delete the dish')
        }
    }
}

module.exports = DishesController