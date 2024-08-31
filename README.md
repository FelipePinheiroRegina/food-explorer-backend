#### Bem-Vindo ao back-end do food-explorer, este projeto tem o intuito de consolidar todos os conhecimentos que eu pude absorver durante minha caminhada na trilha full-stack da tão conceituada rocketseat 🟣🚀
---

#### Tecnologias, conceitos de arquitetura e outros.
Desenvolvi uma API RESTful utilizando Node.js e Express, aplicando conceitos de Model-View-Controller (MVC) e Inversão de Dependências para criar uma estrutura robusta e fácil de manter. A API suporta operações CRUD completas, e utilizei o Knex como query builder para interagir com o banco de dados SQLite.

Para o gerenciamento de arquivos, utilizei Multer e TMP para fazer o upload e salvar imagens localmente no backend. Na lógica de criação de novos usuários, implementei bcryptjs para criptografar senhas e utilizei JWT para autenticação. O sistema oferece duas opções para manipulação de tokens: armazenamento no localStorage ou em cookies, com a lógica baseada em cookies deixada comentada para referência futura.

Para garantir a estabilidade e o monitoramento do servidor em produção, utilizei o PM2, uma ferramenta de gerenciamento de processos avançada.

Por fim, utilizei Jest para realizar os testes automatizados da aplicação, garantindo a qualidade e a confiabilidade do código.

`Node v20.16.0`

`npm v10.8.1`

` "bcryptjs": "^2.4.3"`
` "cookie-parse": "^0.4.0"`
`"cookie-parser": "^1.4.6"`
`"cors": "^2.8.5"`
`"date-fns": "^3.6.0"`
`"date-fns-tz": "^3.1.3"`
`"dotenv": "^16.4.5"`
`"express": "^4.19.2"`
`"express-async-errors": "^3.1.1"`
`"jsonwebtoken": "^9.0.2"`
`"knex": "^3.1.0"`
`"multer": "^1.4.5-lts.1"`
`"npx": "^10.2.2"`
`"pm2": "^5.4.2"`
`"sqlite": "^5.1.1"`
`"sqlite3": "^5.1.7`
` "tmp": "^0.2.3"`

## Tudo sobre as rotas da API

## Rotas de usuário

Para criar um novo usuário - Rota post('/users') espera um json com três props: name, email, password.
``` javascript
// exemplo de requisição

async function createUser() {
   const response = await  api.post('/users', {name, email, password})
}
```

Para fazer o update de um usuário - Rota put('/users') espera um json com 4 props, sendo dois obrigatórios: name, email e dois opcionais: password, newPassword.
```javascript
// exemplo de requisição

async function updateUser() {
   const response = await api.put('/users', {name, email, password, newPassword})
}
```

## Rota de sessão

Para fazer uma sessão - Rota post('/sessions') espera um json com duas props: email, password.
``` javascript
// exemplo de requisição

async function createSession() {
   const response = await  api.post('/sessions', {email, password})
}
// se a requisição for bem sucessida. response irá conter os dados do usuário e um token
{
   "user": {
   "id": 14,
   "name": "Felipe",
   "email": "felipe@email.com",
   "role": "admin",
   "created_at": "2024-07-31 23:36:39",
   "updated_at": "2024-07-31 23:36:39"
   },
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjUwNjM3OTcsImV4cCI6MTcyNTE1MDE5Nywic3ViIjoiMTQifQ.3D4mynPWeUKB6WbwQEMkIsGSXbOubovm0uckXduPnzM"
}
```

## Rota de ingredientes

Para buscar os ingredientes de um determinado prato - Rota get('/ingredients/:id') espera um id params.
``` javascript
// exemplo de requisição

const id = 30

async function indexIngredients() {
   const response = await  api.get(`/ingredients/${id}`)
}

// se a requisição for bem sucessida. response irá conter todos ingredientes que o prato contém
[
	{
		"id": 87,
		"name": "Shrimp",
		"id_dishe": 30,
		"created_at": "2024-08-06 23:27:39",
		"updated_at": "2024-08-06 20:27:39"
	},
	{
		"id": 88,
		"name": "Tomato Sauce",
		"id_dishe": 30,
		"created_at": "2024-08-06 23:27:39",
		"updated_at": "2024-08-06 20:27:39"
	},
	{
		"id": 89,
		"name": "White Wine",
		"id_dishe": 30,
		"created_at": "2024-08-06 23:27:39",
		"updated_at": "2024-08-06 20:27:39"
	}
]
```

## Rotas de pratos

Para criar um novo prato - Rota post('/dishes') espera um multformat.
``` javascript
// exemplo de requisição

async function handleRequestCreate(event) {
        event.preventDefault()
        
        if(imageFile === null || !name || !category || ingredients.length === 0 || !price || !description ) {
            handleOpenError('All fields are required, fill all and try again')
            return
        }

        const nameCapitalize   = capitalize(name)
        const descriptionLower = lowercase(description)

        try {
            const form = new FormData()
            form.append('name', nameCapitalize)
            form.append('description', descriptionLower)
            form.append('price', price)
            form.append('category', category)
            form.append('ingredients', JSON.stringify(ingredients))
            form.append('image', imageFile)
            
            await api.post('/dishes', form)

            handleOpenSuccess('Dish create successfully! ✅✅✅')

            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            if(error.response) {
                handleOpenError(error.response.data.message) 
            } else {
                handleOpenError('Unable to create the dish')
            }
        }
    }
```

Para fazer update em um prato - Rota put('/dishes/:id') espera um  id params e um multformat.
```javascript
// exemplo de requisição

 async function handleRequestCreate(event) {
        event.preventDefault()
        
        if(!name || !category || ingredients.length === 0 || !price || !description ) {
            handleOpenError('All fields are required, fill all and try again')
            return
        }

        const nameCapitalize   = capitalize(name)
        const descriptionLower = lowercase(description)

        try {
            const form = new FormData()
            form.append('name', nameCapitalize)
            form.append('description', descriptionLower)
            form.append('price', price)
            form.append('category', category)
            form.append('ingredients', JSON.stringify(ingredients))
            form.append('image', imageFile)
            
            await api.put(`/dishes/${id}`, form)

            handleOpenSuccess('Update successfully! ✅✅✅')

            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            if(error.response) {
                handleOpenError(error.response.data.message) 
            } else {
                handleOpenError('Unable to update the dish')
            }
        }
    }
```

Para listar todos os pratos - Rota get('/dishes') - aceita nome de um prato ou ingrediente na query: ex.: dishes?name=salada
```javascript
// exemplo de requisição

async function index() {
   const response = await api.get('/dishes')
}

// ou para buscar pratos por nomes ou ingredientes

async function index() {
  response = await api.get(`/dishes?name=${name}`)
}

// se a requisição for sucesso, retorna...
[
	{
		"id": 30,
		"name": "Spaghetti Gambe",
		"image": "fb1c508a48924c48ce9f-Mask group-2.png",
		"description": "A good italian pasta recipe can brighten up anyone’s day!",
		"price": "79,97",
		"category": "meal",
		"created_at": "2024-07-31 21:13:49",
		"updated_at": "2024-08-06 20:27:39"
	},
	{
		"id": 31,
		"name": "Passion Fruit",
		"image": "35cba7dbb25b480ceaa6-Mask group-8.png",
		"description": "A refreshing and healthy drink for your day!",
		"price": "25,00",
		"category": "juice",
		"created_at": "2024-07-31 22:46:26",
		"updated_at": "2024-08-06 20:31:59"
	}
]
    
```

Para ver os detalhes de um prato específico - Rota get('/dishes/:id') espera um id no params
```javascript
// exemplo de requisição
async function fetchDetails() {
         try {
             let response = await api.get(`/dishes/${id}`)
             setDish(response.data)
             
             const exists = JSON.parse(sessionStorage.getItem(`@foodexplorer:qtdDish:${response.data.name}`))
             if(exists) {
                 setQtd(exists.qtd)
             }

             response = await api.get(`/ingredients/${id}`)
             setIngredients(response.data)
         } catch (error) {
             if(error.response) {
                 handleOpenError(error.response.data.message)
             } else {
                 handleOpenError('Unable load details')
             }
         }

   {
	"id": 30,
	"name": "Spaghetti Gambe",
	"image": "fb1c508a48924c48ce9f-Mask group-2.png",
	"description": "A good italian pasta recipe can brighten up anyone’s day!",
	"price": "79,97",
	"category": "meal",
	"created_at": "2024-07-31 21:13:49",
	"updated_at": "2024-08-06 20:27:39"
}
```

Para deletar um prato - Rota delete('/dishes/:id') espera um id no params
```javascript
// exemplo de requisição
 async function handleDeleteDish() {
        const isOK = confirm('Really want to delete this dish?')

        if(isOK) {
            try {
                await api.delete(`/dishes/${id}`)

                handleOpenSuccess('Delete successfully! ✅✅✅')

                setTimeout(() => {
                    navigate('/')
                }, 2000);
                

            } catch (error) {
                if(error.response) {
                    handleOpenError(error.response.data.message) 
                } else {
                    handleOpenError('Unable to delete the dish')
                }  
            }
        } else {
            return
        }
    }
```
---

## Como rodar a API.
1. **Baixe o arquivo ZIP do projeto para sua máquina.**
2. **Extraia o conteúdo do ZIP e acesse a pasta raiz do projeto pelo terminal.**
3. **Instale as dependências** executando o comando: `npm install`.
4. **Aplique as migrações do banco de dados** com o comando: `npx knex migrate:latest`.
5. **Crie um arquivo `.env` na raiz do projeto** e defina os valores das variáveis de ambiente necessárias:
   - `AUTH_SECRET=`
   - `SERVER_PORT=`
6. **Para rodar o projeto em modo de desenvolvimento**, execute: `npm run dev`.
7. **Para rodar o projeto em produção**, execute: `npm start`.

#### Repositório do front-end
- [Repositório](https://github.com/FelipePinheiroRegina/food-explorer-frontend)
- [Projeto no ar](https://food-explorer-pinheiro.netlify.app/)


   
