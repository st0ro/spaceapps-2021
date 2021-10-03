const express = require('express')
const bodyParser = require('body-parser')
const db = require("./db")
const app = express()

const port = 25565

app.use(express.static("public"));
app.use(bodyParser.json())


app.post('/adduser', (req, res)=>{
    db.addUser(req.body.name, req.body.seat, req.body.position)
})

app.get('/getuser/', (req, res)=>{
    res.send(db.getUsers())
})

app.post('/addlog', (req, res)=>{
    db.addLog(req.body.user, req.body.content, req.body.timestamp, req.body.tags)
})

app.get('/getlogs', (req, res)=>{
    res.send(db.getLogs())
})


app.listen(port, () => {
    console.log(`Spaceapps 2021 listening at port ${port}`)
})