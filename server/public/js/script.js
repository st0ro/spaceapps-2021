var logs;
var blacklistUsers = [], whitelistTags = []

function loadUsers() {
    $.ajax({
        url: "/getusers",
        type: "GET",
        success: function (res) {
            var json = JSON.parse(res)
            var innerhtml = `<table class="table table-hover">
          <thead">
          <colgroup>
           <col span="1" style="width: 10%;">
           <col span="1" style="width: 35%;">
           <col span="1" style="width: 15%;">
           <col span="1" style="width: 40%;">
          </colgroup>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Seat</th>
            <th scope="col">Position</th>
          </tr>
          </thead>
          <tbody>`;
            json.forEach(function (element) {
                innerhtml += `<tr>
            <td><input type="checkbox" class="selectUserInput" data-user="${element.name}" checked></input></td>
            <td>${element.name}</td>
            <td>${element.seat}</td>
            <td>${element.position}</td>
          </tr>`
            })
            innerhtml += `</tbody>
        </table>`

            document.getElementById("nav-user").innerHTML = innerhtml
            let users = document.getElementsByClassName("selectUserInput")
            Array.from(users).forEach(element => {
                element.addEventListener('input', updateUserFilter)
            })
        }
    })
}

function loadTags() {
    $.ajax({
        url: "/gettags",
        type: "GET",
        success: function (res) {
            var json = JSON.parse(res)
            whitelistTags = JSON.parse(res)
            var innerhtml = `<table class="table table-hover">
          <colgroup>
           <col span="1" style="width: 20%;">
           <col span="1" style="width: 80%;">
          </colgroup>
          <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Category</th>
          </tr>
          </thead>
          <tbody>`;
            json.forEach(function (element) {
                innerhtml += `<tr>
            <td><input type="checkbox" class="selectTagInput" data-tag="${element}" checked></input></td>
            <td>${element.charAt(0).toUpperCase() + element.slice(1)}</td>
          </tr>`
            })
            innerhtml += `</tbody>
        </table>`

            document.getElementById("nav-group").innerHTML = innerhtml
            let tags = document.getElementsByClassName("selectTagInput")
            Array.from(tags).forEach(element => {
                element.addEventListener('input', updateTagFilter)
            })
        }
    })
}

function loadLogs() {
    $.ajax({
        url: "/getlogs",
        type: "GET",
        success: function (res) {
            logs = JSON.parse(res)
            fillConsoleLogs()
        }
    })
}

function updateUserFilter(event) {
    if(event.target.checked){
        const index = blacklistUsers.indexOf(event.target.dataset.user);
        if (index > -1) {
            blacklistUsers.splice(index, 1);
        }
    }
    else{
        blacklistUsers.push(event.target.dataset.user)
    }
    fillConsoleLogs()
}

function updateTagFilter(event) {
    if(!event.target.checked){
        const index = whitelistTags.indexOf(event.target.dataset.tag);
        if (index > -1) {
            whitelistTags.splice(index, 1);
        }
    }
    else{
        whitelistTags.push(event.target.dataset.tag)
    }
    fillConsoleLogs()
}

function fillConsoleLogs() {
    let newLogs = JSON.parse(JSON.stringify(logs))
    let i = 0;
    while(i < newLogs.length){
        if(blacklistUsers.includes(newLogs[i].user) || !newLogs[i].tags.some(r=>whitelistTags.includes(r))){
            newLogs.splice(i, 1);
        } else {
            ++i;
        }
    }
    let innerhtml = `<table class="table table-hover" id="thetable">
          <colgroup>
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 55%;">
          </colgroup>
          <tbody>`;
    newLogs.forEach(function (element) {
        innerhtml += `<tr>
            <td>${element.timestamp}</td>
            <td>${element.user}</td>
            <td>`
        element.tags.forEach(function (tag) {
            innerhtml += `<span class="p-2 bg-secondary sp-tag">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
        })
        innerhtml += `</td>
            <td>${element.content}</td>
          </tr>`
    })
    innerhtml += `</tbody>
        </table>`


    document.getElementById("consoleTable").innerHTML = innerhtml
    let table = document.getElementById('thetable')
    let lastRow = table.rows[table.rows.length - 1]

}

setTimeout(function () {
    loadUsers()
    loadTags()
    loadLogs()
    setInterval(loadLogs, 1000)
}, 200)

function submitlog()
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/addlog", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify({
    content : document.getElementById("content-input").value,
    tags : document.getElementById("tag-input").value.split(","),
    user : "Bob"
  })
  document.getElementById("tag-input").value = "";
  document.getElementById("content-input").value = "";
  console.log(payload);
  xhr.send(payload)
}
