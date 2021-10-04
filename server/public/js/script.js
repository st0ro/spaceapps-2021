var logs, logCount = 0
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
                innerhtml += `<tr id="filterUser${element.name.trim()}">
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
                innerhtml += `<tr id="filterTag${element.trim()}">
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
            let newLogs = JSON.parse(JSON.stringify(logs))
            if(newLogs.length !== logCount){
                fillConsoleLogs()
            }
            logCount = newLogs.length
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
    let i = 0;
    while(i < logs.length){
        if(blacklistUsers.includes(logs[i].user) || !logs[i].tags.some(r=>whitelistTags.includes(r))){
            logs.splice(i, 1);
        } else {
            ++i;
        }
    }
    let innerhtml = `<table class="table table-hover" id="thetable">
          <colgroup>
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 50%;">
            <col span="1" style="width: 5%;">
          </colgroup>
          <tbody>`;
    logs.forEach(function (element) {
        innerhtml += `<tr id="log${element.user.replace(/\s+/g, '')+element.timestamp.replace(/\W/g, '')}">
            <td>${element.timestamp}</td>
            <td>${element.user}</td>
            <td>`
        element.tags.forEach(function (tag) {
            innerhtml += `<span class="p-2 bg-secondary sp-tag">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
        })
        innerhtml += `</td>
            <td>` + parseContent(element.content) + `</td>
            <td style="padding-top: 5px;">
                <button class="btn" style="height: 16px; padding: 0px" onclick="tagForm('${element.user}', '${element.timestamp}')">
                    <i class="bi-box-arrow-in-up" style="font-size: 20px"></i>
                </button>
            </td>
        </tr>`
    })
    innerhtml += `</tbody>
        </table>`


    document.getElementById("consoleTable").innerHTML = innerhtml
    let table = document.getElementById('thetable')
    let lastRow = table.rows[table.rows.length - 1]

}

document.getElementById("search-bar").addEventListener("input", search, false);

function search(event) {
    let userTabClass = document.getElementById("nav-user-tab").className
    let categoryTabClass = document.getElementById("nav-group-tab").className
    let searchStr = event.target.value

    var targets
    if (userTabClass === "nav-link active")
        targets = document.getElementsByClassName("selectUserInput")
    else if (categoryTabClass === "nav-link active")
        targets = document.getElementsByClassName("selectTagInput")
    if (searchStr === null) {
        Array.from(targets).forEach(target => {
            document.getElementById("filterUser" + target.dataset.user.trim()).style.display = ''
        })
    }
    else {
        Array.from(targets).forEach(target => {
            let data
            let id
            if (userTabClass === "nav-link active") {
                data = target.dataset.user
                id = "filterUser"
            }
            else if (categoryTabClass === "nav-link active") {
                data = target.dataset.tag
                id = "filterTag"
            }
            if (!data.toLowerCase().includes(searchStr.toLowerCase())) {
                let hiddenTarget = document.getElementById(id + data.trim())
                hiddenTarget.style.display = 'none'
            }
            else
                document.getElementById(id + data.trim()).style.display = ''
        })
    }
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

function parseContent(content){
    let words = content.match(/@\w+#\d+/g)
    if(words !== null) {
        words.forEach(word => {
            let data = word.split(/@|#/g)
            content = content.replace(word, `<a href="#log${data[1]+data[2]}" onclick="highlightById('log${data[1]+data[2]}')">#${data[2]}</a>`)
        })
    }

    content = content.replace("critical", "<span style='color: red; font-weight: bold'>critical</span>")
    content = content.replace("Critical", "<span style='color: red; font-weight: bold'>Critical</span>")

    content = content.replace("warning", "<span style='color: gold; font-weight: bold'>warning</span>")
    content = content.replace("Warning", "<span style='color: gold; font-weight: bold'>Warning</span>")
    return content
}

function highlightById(id){
    $("#"+id).addClass("highlight-fade")
    setTimeout(()=> {
        $("#" + id).removeClass("highlight-fade")
    }, 1000)
}

function tagForm(user, time){
    console.log(user, time)
    var input = $("#content-input")
    input.val( input.val() + `@${user.replace(/\s+/g, '')}#${time.replace(/\W/g, '')}` )
}