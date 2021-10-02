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

exports.getUser = function(name) {
    for (const user in users) {
        if (user.name === name)
            return user
    }
    return null
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

exports.getLog = function(user) {
    for (const log in logs) {
        if (log.user === user)
            return log
    }
    return null
}

exports.getLog = function(tags) {
    let logs = []
    for (const log in logs) {
        for (const logTag in log.tags) {
            for (const tag in tags) {
                if (logTag === tag)
                    logs.push(log)
            }
        }
    }
    return logs
}
