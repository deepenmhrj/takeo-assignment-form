const tableElement = document.querySelector('table');

const URL = `http://localhost:3000/employees`;

const postData = () => {
  const title = document.getElementById("title").value;
  const current = document.getElementById("current").value;
  const previous = document.getElementById("previous").value;
  // console.log(title, current, previous);

  const inputData = { title, current, previous };
  const method = "POST";


  fetch(URL, {
    method,
    body: JSON.stringify(inputData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status = 201) {
      console.log('Employee Added!')
    }
  })
}

const getData = async () => {
  try {
    const resp = await fetch(URL);
    let data = await resp.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);

    let rows = `
      <tr>
        <form action=${URL}>
        <th>ID</th>
        <th><input type = "text" name = "title" class="form-control" placeholder = "Designation" id = "title"></th>
        <th><input type = "text" name = "current" class="form-control" placeholder = "Current Employer" id = "current"></th>
        <th><input type = "text" name = "previous" class="form-control" placeholder = "Past Employer" id = "previous"></th>
        <td>
          <input type="submit" class="btn btn-success" value = "Add" onclick = "postData()"></input>
        </td>
      </form>
      </tr>`;

    data.forEach(employee => {
      rows = rows + `
        <tr>
          <td>${employee.id}</td>
          <td><input class="form-control" value = ${employee.title}></td>
          <td><input class="form-control" value = ${employee.current}></td>
          <td><input class="form-control" value = ${employee.past}></td>
          <td>
            <button type="button" class="btn btn-primary" >Remove</button>
          </td>


        </tr>
        `
    });

    tableElement.innerHTML = (rows);

  } catch (error) {
    console.log(error);
  }
};

getData();
