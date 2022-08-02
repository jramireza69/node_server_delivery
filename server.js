const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const multer = require('multer')

/*
*IMPORTAR RUTAS 
*/
const usersRoutes = require('./routes/userRoutes')


const port  = process.env.port || 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')

app.disable('x-powered-by')


app.set('port' , port)

const upload = multer({
    storage: multer.memoryStorage()
})

/*
*LLAMADO DE LAS  RUTAS 
*/

usersRoutes(app, upload)

server.listen(3000, '192.168.20.22' || 'localhost', function(){
    console.log('Aplicacion de node js ' + process.pid + '  iniciada...' +  port);
})

app.get('/', (req, res) => { 
    res.send('Fluter ruta raiz del bakend')
})
app.get('/test', (req, res) => { 
    res.send('ruta test')
})

// ERROR HANDLER 

app.use((err, req, res, next) =>{

    console.log(err)
     res.status(err.status || 500 ).send(err.stack)
}
  )