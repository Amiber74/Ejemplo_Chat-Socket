import __dirname from './utils.js'
import  express  from 'express'
import handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import {Server} from 'socket.io'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))
app.use('/',viewRouter)

const  httpServer = app.listen(8080,()=>{console.log('servidor levantado en el puerto 8080')})

export const io = new Server(httpServer)



const Chat = []

io.on('connect',socket => {
    console.log('nuevo cliente conectado: ', socket.id)

    socket.on('message', data =>{
        Chat.unshift(data)
        io.emit('MessagesLog', Chat)
    })

    socket.on('UserConnect',data =>{
        socket.emit('MessagesLog', Chat)
        socket.broadcast.emit('newUser', data)
    })
    
    // socket.broadcast.emit('newUser', data)
})