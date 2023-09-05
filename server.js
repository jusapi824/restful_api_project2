const express = require('express') // Para incluir el Framework
const app = express(); // Instancia del framework Express
const bodyParser = require('body-parser')
const morgan = require('morgan')

if(process.env.NODE_ENV !== 'production'){
    console.log(process.env.NODE_ENV)
    require('dotenv').config();
}

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(bodyParser.urlencoded({extended:false}))// Recibir datos formulario sencillos
app.use(bodyParser.json()) // Para recibir json
app.use(morgan('combined'))

app.use('/api/v1/users',require('./api/v1/routes/users.routes'))

app.listen(app.get('port'),()=>{
    console.log(`Server running on localhost:${app.get('port')}`);
})