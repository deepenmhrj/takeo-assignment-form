const tableElement = document.querySelector('table');

const URL = `http://localhost:3000`
const getData = async () => {
  try {
    const resp = await fetch(URL + '/employees');
    let data = await resp.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);

    let rows = `
      <tr>
          <th><input class="form-control" placeholder = "ID" id ='id'></th>
          <th><input class="form-control" placeholder = "Designation" id = "title"></th>
          <th><input class="form-control" placeholder = "Current Employer" id = "current"></th>
          <th><input class="form-control" placeholder = "Past Employer" id = "title"></th>
          <td>
            <button type="button" class="btn btn-success">Add</button>
          </td>
      </tr>`;
    data.forEach(employee => {
      rows = rows + `
        <tr>
          <td>${employee.id}</td>
          <td><input class="form-control" value = ${employee.title}></td>
          <td><input class="form-control" value = ${employee.current}></td>
          <td><input class="form-control" value = ${employee.past}></td>
          <td>
            <button type="button" class="btn btn-primary">Remove</button>
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
