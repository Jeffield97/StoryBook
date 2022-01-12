const path = require('path');
const express = require('express')
const dotenv= require('dotenv')
const passport = require('passport')
const {connection}= require("./config/db")
const morgan = require('morgan')
const exphbs = require('express-handlebars')
//load config
connection()
dotenv.config({path:'./.env'})
const app = express()

if(process.env.MODE==='dev'){
    app.use(morgan('dev'))
}

//Handlebars Middleware
//app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.engine('.hbs', exphbs.engine({defaultLayout: "main",  extname: '.hbs'}));
app.set('view engine','.hbs')

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routers
app.use('/',require('./routes/index'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))