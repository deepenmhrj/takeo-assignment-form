const bodyElement = document.querySelector("body");
const tableElement = document.querySelector("tbody");

const URL = `http://localhost:3000/employees`;
const data = [{
  'title': '',
  'current': '',
  'past': '',
}];

const tableHeader = document.createElement("tr");
tableHeader.innerHTML = `
      <form action=${URL}>
        <th>Title</th>
        <th>Current Employer</th>
        <th>Past Employer</th>
        <th>
          <button type="button" class="btn btn-primary" value = "Add" onclick = "addRows()">Add</button>
        </th>
      </form>
   `;

tableElement.append(tableHeader);

const rowCount = data.length;

const addRows = () => {
  const row = document.createElement("tr");
  const i = rowCount - 1;
  row.innerHTML = `<th>
    <input type = "text" name = "title" class="form-control" placeholder = "Designation" id = "title-${i}" >
    </th>
    <th>
    <input type = "text" name = "current" class="form-control" placeholder = "Current Employer" id = "current-${i}"  >
    </th>
    <th>
    <input type = "text" name = "previous" class="form-control" placeholder = "Past Employer" id = "past-${i}" >
    </th>`

  tableElement.append(row);
}


const submitForm = document.createElement("form");
submitForm.innerHTML = `
  <form>
    <button type = "button", class= "btn btn-success id = "submit" onclick = "postData()"> Submit
    </button>
  </form >`;

bodyElement.appendChild(submitForm);

const postData = () => {
  console.log(data);
  data.forEach((emplooyee, i) => {
    const title = document.getElementById(`title-${i}`).value;
    const current = document.getElementById(`current-${i}`).value;
    const past = document.getElementById(`past-${i}`).value;

    const inputData = { title, current, past };
    data[i] = inputData;
  });

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status == 201) {
      console.log("Employee/s added!")
    }
  })
}