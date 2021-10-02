const express = require('express')
const app = express()

const port = 25565

app.use(express.static("public"));

app.get('/uwu/', (req, res)=>{
    res.send('uwu')
})

app.listen(port, () => {
    console.log(`Spaceapps 2021 listening at port ${port}`)
})