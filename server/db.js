const fs = require('fs')

const users = require("./data/users.json")
const logs = require("./data/logs.json")

exports.addUser = function(name, seat, position) {
    users.push({
        name: name,
        seat: seat,
        position: position
    })
    fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err)
        }
    })
}

exports.getUsers = function() {
    return JSON.stringify(users)
}

exports.addLog = function(user, content, timestamp, tags) {
    logs.push({
        user: user,
        content: content,
        timestamp: timestamp,
        tags: tags
    })
    fs.writeFile("data/logs.json", JSON.stringify(logs), (err) => {
        if (err) {
            console.error(err)
        }
    })
}

exports.getLogs = function() {
    return JSON.stringify(logs)
}
