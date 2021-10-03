const fs = require('fs')

const users = require("./data/users.json")
const logs = require("./data/logs.json")
const tags = require("./data/tags.json")

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

exports.addLog = function(user, content, newTags) {
    let dateOb = new Date()
    let date = String(("0" + dateOb.getDate())).slice(-2)
    let month = String(("0" + (dateOb.getMonth() + 1))).slice(-2)
    let year = String(dateOb.getFullYear())
    let hours = String(dateOb.getHours())
    let minutes = String(dateOb.getMinutes())
    let seconds = String(dateOb.getSeconds())
    let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    logs.push({
        user: user,
        content: content,
        timestamp: timestamp,
        tags: JSON.parse(newTags)
    })
    JSON.parse(newTags).forEach(function(tag) {
        exports.addTag(tag)
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

exports.addTag = function (newTag) {
    let found = false
    tags.forEach(function(tag) {
        if (tag === newTag) {
            found = true
        }
    })
    if (!found)
        tags.push(newTag)
    fs.writeFile("data/tags.json", JSON.stringify(tags), (err) => {
        if (err) {
            console.error(err)
        }
    })
}

exports.getTags = function() {
    return JSON.stringify(tags)
}