const tableElement = document.querySelector('table');
const bodyElement = document.querySelector('body');

const URL = `http://localhost:3000/employees`;
const data = [{
  'title': '',
  'current': '',
  'past': '',
}];

const getData = async () => {
  try {

    const resp = await fetch(URL);
    let data = await resp.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);

  } catch (error) {
    console.log(error);
  }
};

let header = `
    <tr>
      <form action=${URL}>
        <th>Title</th>
        <th>Current Employer</th>
        <th>Past Employer</th>
        <th>
          <button type="button" class="btn btn-primary" value = "Add" onclick = "inputData()">Add</button>
        </th>
      </form>
    </tr>`;

tableElement.innerHTML = header;

const inputData = () => {

  let rows = ``;

  data.forEach((employee, i) => {
    rows = rows + `
    <tr>
    <th>
    <input type = "text" name = "title" class="form-control" placeholder = "Designation" id = "title-${i}" value = ${data[i].title}>
    </th>
    <th>
    <input type = "text" name = "current" class="form-control" placeholder = "Current Employer" id = "current-${i}" value = ${data[i].current} >
    </th>
    <th>
    <input type = "text" name = "previous" class="form-control" placeholder = "Past Employer" id = "past-${i}" value = ${data[i].past}>
    </th>
    </tr>`;

  })
  data.push({
    'title': '',
    'current': '',
    'past': '',
  });

  tableElement.innerHTML = (header + rows);
  getInput();
}


const getInput = () => {
  data.forEach((emplooyee, i) => {
    const title = document.getElementById(`title-${i}`).value;
    const current = document.getElementById(`current-${i}`).value;
    const past = document.getElementById(`past-${i}`).value;

    const inputData = { title, current, past };
    data[i] = inputData;
  })
  console.log(data);

}

const submitForm = document.createElement("form");
submitForm.innerHTML = `
  <form>
    <button type = "button", class= "btn btn-success id = "submit" onclick = "postData()"> Submit
    </button>
  </form >`;

bodyElement.appendChild(submitForm);

const postData = () => {
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
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


const removeData = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
}

const displayData = () => {

}

inputData();

   // rows = rows + `
    //     <tr>
    //       <td>${employee.id}</td>
    //       <td><input class="form-control" value = ${employee.title}></td>
    //       <td><input class="form-control" value = ${employee.current}></td>
    //       <td><input class="form-control" value = ${employee.past}></td>
    //       <td>
    //         <button type="button" class="btn btn-primary" onclick="removeData(${employee.id})" >Remove</button>
    //       </td>
    //     </tr>
    //     `
