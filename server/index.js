const express = require('express')
const bodyParser = require('body-parser')
const db = require("./db")
const app = express()

const port = 25565

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/adduser', (req, res)=>{
    db.addUser(req.body.name, req.body.seat, req.body.position)
    res.send("OK")
})

app.get('/getusers', (req, res)=>{
    res.send(db.getUsers())
})

app.post('/addlog', (req, res)=>{
    console.log(req.body);
    db.addLog(req.body.user, req.body.content, req.body.tags)
    res.send("OK")
})

app.get('/getlogs', (req, res)=>{
    res.send(db.getLogs())
})

app.post('/addtag', (req, res)=>{
    db.addTag(req.body.tag)
    res.send("OK")
})

app.get('/gettags', (req, res)=>{
    res.send(db.getTags())
})

app.listen(port, () => {
    console.log(`Spaceapps 2021 listening at port ${port}`)
})