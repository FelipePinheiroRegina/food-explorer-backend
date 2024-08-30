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

#### Como rodar a API.
1. **Baixe o arquivo ZIP do projeto para sua máquina.**
2. **Extraia o conteúdo do ZIP e acesse a pasta raiz do projeto pelo terminal.**
3. **Instale as dependências** executando o comando: `npm install`.
4. **Aplique as migrações do banco de dados** com o comando: `npx knex migrate:latest`.
5. **Crie um arquivo `.env` na raiz do projeto** e defina os valores das variáveis de ambiente necessárias:
   - `AUTH_SECRET=`
   - `SERVER_PORT=`
6. **Para rodar o projeto em modo de desenvolvimento**, execute: `npm run dev`.
7. **Para rodar o projeto em produção**, execute: `npm start`.

   
