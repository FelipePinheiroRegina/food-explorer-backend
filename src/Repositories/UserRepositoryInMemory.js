class UserRepositoryInMemory {
    users = []

    async create({ name, email, password }) {
        const user = {
            id: Math.random() * 1000,
            name,
            email,
            password
        }

        this.users.push(user)

        return user
    }

    async findByEmail(email) {
        return this.users.find(user => user.email == email)
    }

    async findById(id) {
        return this.users.find(user => user.id == id)
    }

    async update(id, user) {
        return this.users
    }
}

module.exports = UserRepositoryInMemory