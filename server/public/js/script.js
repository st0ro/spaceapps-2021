$.ajax({
    url: "/getusers",
    type: "GET",
    success: function (res){
        var json = JSON.parse(res)
        var innerhtml = `<table class="table table-hover">
          <thead class="thead-dark">
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
            <th scope="row"><input type="checkbox" class="selectInput" linked-user="${element.name}"></input></th>
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