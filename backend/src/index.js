const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')    
const http = require('http')

mongoose.connect('mongodb://devRadar:devRadar@cluster0-shard-00-00-pj0hg.mongodb.net:27017,cluster0-shard-00-01-pj0hg.mongodb.net:27017,cluster0-shard-00-02-pj0hg.mongodb.net:27017/devdata?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
const server = http.Server(app)

const routes = require('./routes.js')
const { setupWebsocket } = require('./websocket.js')

setupWebsocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)