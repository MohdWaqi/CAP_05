// fill in javascript code here
const formData = document.querySelector("form");
const employeeName = document.getElementById("name");
const employeeId = document.getElementById("employeeID");
const employeeDept = document.getElementById("department");
const employeeExperience = document.getElementById("exp");
const employeeEmail = document.getElementById("email");
const employeeMobile = document.getElementById("mbl");
const tableBody = document.querySelector("tbody");

formData.addEventListener("submit", function (event) {
  event.preventDefault();

  let gotData = {
    name: employeeName.value,
    id: employeeId.value,
    department: employeeDept.value,
    experience: employeeExperience.value,
    mail: employeeEmail.value,
    contact: employeeMobile.value,
  };
  let tableRow = document.createElement("tr");
  let tdName = document.createElement("td");
  let tdId = document.createElement("td");
  let tdDept = document.createElement("td");
  let tdEmail = document.createElement("td");
  let tdExperience = document.createElement("td");
  let tdContact = document.createElement("td");
  let tdRole = document.createElement("td");
  let tdDelete = document.createElement("td");

  if (gotData.experience <= 1) {
    tdRole.innerText = "Fresher";
  } else if (gotData.experience >= 2 && gotData.experience <= 5) {
    tdRole.innerText = "Junior";
  } else {
    tdRole.innerText = "Senior";
  }

  tdName.innerText = gotData.name;
  tdId.innerText = gotData.id;
  tdDept.innerText = gotData.department;
  tdEmail.innerText = gotData.mail;
  tdExperience.innerText = gotData.experience;
  tdContact.innerText = gotData.contact;

  tdDelete.innerHTML = "<button class='deleteBtn'>Delete</button>";
  tableRow.append(
    tdName,
    tdId,
    tdDept,
    tdExperience,
    tdEmail,
    tdContact,
    tdRole,
    tdDelete
  );
  tableBody.append(tableRow);

  let tableEL = document.querySelector("table");

  let deleteButton = document.querySelectorAll("td > button");

  for (let element of deleteButton) {
    element.style.backgroundColor = "red";
  }

  tableEL.addEventListener("click", function (e) {
    if (!e.target.classList.contains("deleteBtn")) {
      console.log(e.target.classList);
      return;
    }
    console.log(e.target.classList);
    const btn = e.target;
    btn.closest("tr").remove();
  });
  employeeName.value = "";
  employeeId.value = "";
  employeeDept.value = "";
  employeeExperience.value = "";
  employeeEmail.value = "";
  employeeMobile.value = "";
});
