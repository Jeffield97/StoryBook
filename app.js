const express = require('express')
const dotenv= require('dotenv')
const {connection}= require("./config/db")
const morgan = require('morgan')
const {engine} = require('express-handlebars')
//load config
connection()
dotenv.config({path:'./.env'})
const app = express()

if(process.env.MODE==='dev'){
    app.use(morgan('dev'))
}

//Handlebars Middleware
//app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine','.hbs')

//Routers
app.use('/',require('./routes/index'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))