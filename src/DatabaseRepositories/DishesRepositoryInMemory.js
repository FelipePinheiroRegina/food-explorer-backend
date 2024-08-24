class DishesRepositoryInMemory {
    constructor() {
        this.dishes = [
            {   
                id: 1,
                name: 'Salada',
                description: 'Salada Saudável',
                price: 20.50,
                category: 'meal',
                image: 'path/to/image.png',
                created_at: '28/12/1998',
                updated_at: '28/12/1998'
            },
            {   
                id: 2,
                name: 'Carne',
                description: 'Carne Magra',
                price: 25.50,
                category: 'meal',
                image: 'path/to/image.png',
                created_at: '28/12/1998',
                updated_at: '28/12/1998'
            },

            {   
                id: 4,
                name: 'seila',
                description: 'seila',
                price: 25.50,
                category: 'meal',
                image: 'path/to/image.png',
                created_at: '28/12/1998',
                updated_at: '28/12/1998'
            }
        ]
    }

    async create({ name, image, description, price, category, dateFormated }) {
        const dishesOfCreate = []
        dishesOfCreate.push({
            id: Math.random() * 1000,
            name,
            image,
            description,
            price,
            category,
            created_at: dateFormated,
            updated_at: dateFormated

        })
        
        return dishesOfCreate[dishesOfCreate.length - 1].id
    }

    async findByName(name) {
        const dish = this.dishes.filter(dish => dish.name == name)

        return dish
    }

    async findByAll() {
        return this.dishes
    }

    async findByDishesWithIdIngredients(ingredientIds) {
        const response = []

        ingredientIds.forEach(id => {
            let aux = this.dishes.filter(dish => dish.id == id)
            response.push(aux)
        })

        return response        
    }

    async findById(id) {
        const dish = this.dishes.find(dish => dish.id === id);
        
        return dish || null;
    }

    async delete(id) {
        const idToRemove = id;
        
        const indexToRemove = this.dishes.findIndex(dish => dish.id === idToRemove);
        
        if (indexToRemove !== -1) {
            // Remover o objeto do array
            this.dishes.splice(indexToRemove, 1);
        }
        
        return this.dishes
    }

    async update(id, dishUpdate) {
        const arrayUpdate = this.dishes.map(dish => 
        dish.id === id ?  dishUpdate :dish
        )
    }
}

module.exports = DishesRepositoryInMemory