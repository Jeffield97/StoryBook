const path = require('path');
const express = require('express')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const passport = require('passport')
const session = require('express-session')
const {connection}= require("./config/db")
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const config = require('./config/index')
const MongoStore = require('connect-mongo')
const { cookie } = require('express/lib/response');
//load config
connection()
dotenv.config({path:'./.env'})
const app = express()

//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))


if(process.env.MODE==='dev'){
    app.use(morgan('dev'))
}

//Passport config
require('./config/passport')(passport)

//Handlebars Helper
const {formatDate,stripTags,truncate,editIcon,select}= require('./helpers/hbs')

//Handlebars Middleware
//app.engine('.hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.engine('.hbs', exphbs.engine({helpers:{
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
}, defaultLayout: "main",  extname: '.hbs'}));
app.set('view engine','.hbs')


//Session Middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: `mongodb://Jeffield:${config.password}@sox-shard-00-00.cotz4.mongodb.net:27017,sox-shard-00-01.cotz4.mongodb.net:27017,sox-shard-00-02.cotz4.mongodb.net:27017/softmovie?authSource=admin&replicaSet=atlas-plokrw-shard-0&readPreference=primaryPreferred&appname=MongoDB%20Compass&ssl=true`}),
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Set global
app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next()
})

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routers
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))