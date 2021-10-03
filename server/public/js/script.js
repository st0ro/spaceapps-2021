$.ajax({
    url: "/getusers",
    type: "GET",
    success: function (res){
        var json = JSON.parse(res)
        var innerhtml = `<table class="table table-hover">
          <thead class="thead-dark">
          <colgroup>
           <col span="1" style="width: 20%;">
           <col span="1" style="width: 30%;">
           <col span="1" style="width: 20%;">
           <col span="1" style="width: 30%;">
          </colgroup>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Seat</th>
            <th scope="col">Position</th>
          </tr>
          </thead>
          <tbody>`;
        json.forEach(function (element){
            innerhtml += `<tr>
            <td><input type="checkbox" class="selectUserInput" linked-user="${element.name}"></input></td>
            <td>${element.name}</td>
            <td>${element.seat}</td>
            <td>${element.position}</td>
          </tr>`
        })
        innerhtml +=`</tbody>
        </table>`

        document.getElementById("nav-user").innerHTML = innerhtml
    }
})

$.ajax({
    url: "/gettags",
    type: "GET",
    success: function (res){
        var json = JSON.parse(res)
        var innerhtml = `<table class="table table-hover">
          <thead class="thead-dark">
          <colgroup>
           <col span="1" style="width: 20%;">
           <col span="1" style="width: 80%;">
          </colgroup>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Category</th>
          </tr>
          </thead>
          <tbody>`;
        json.forEach(function (element){
            innerhtml += `<tr>
            <td><input type="checkbox" class="selectTagInput" linked-tag="${element}"></input></td>
            <td>${element.charAt(0).toUpperCase() + element.slice(1)}</td>
          </tr>`
        })
        innerhtml +=`</tbody>
        </table>`

        document.getElementById("nav-group").innerHTML = innerhtml
    }
})

$.ajax({
    url: "/getlogs",
    type: "GET",
    success: function (res){
        var json = JSON.parse(res)
        var innerhtml = `<table class="table table-hover">
          <thead class="thead-dark">
          <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">User</th>
            <th scope="col">Categories</th>
            <th scope="col">Content</th>
          </tr>
          </thead>
          <tbody>`;
        json.forEach(function (element){
            innerhtml += `<tr>
            <td>${element.timestamp}</td>
            <td>${element.user}</td>
            <td>${element.tags}</td>
            <td>${element.content}</td>
          </tr>`
        })
        innerhtml +=`</tbody>
        </table>`

        document.getElementById("consoleTable").innerHTML = innerhtml
    }
})