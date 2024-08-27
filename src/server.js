require('express-async-errors')
const cors = require('cors')
require('dotenv/config')

const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/uploads')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// cookies
/*
app.use(cors({
    origin: ["https://food-explorer-pinheiro.netlify.app/"],
    credentials: true 
}))
*/

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: 'error',
        message: 'internal error server'
    })
})

const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, '0.0.0.0', () => console.log('Server is running on PORT: ' + PORT))





