// fill in javascript code here
// fill in javascript code here
const formData = document.querySelector("form");
const doctorName = document.getElementById("name");
const doctorId = document.getElementById("docID");
const doctorDept = document.getElementById("dept");
const doctorExperience = document.getElementById("exp");
const doctorEmail = document.getElementById("email");
const doctorMobile = document.getElementById("mbl");
const tableBody = document.querySelector("tbody");

formData.addEventListener("submit", function (event) {
  event.preventDefault();
  let allDoctors = []
  allDoctors.push({
    name: doctorName.value,
    id: doctorId.value,
    department: doctorDept.value,
    experience: doctorExperience.value,
    mail: doctorEmail.value,
    contact: doctorMobile.value,
  });
  allDoctors.forEach(function (element){
    let tableRow = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdId = document.createElement("td");
    let tdDept = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdExperience = document.createElement("td");
    let tdContact = document.createElement("td");
    let tdRole = document.createElement("td");
    let tdDelete = document.createElement("td");
    

    if (element.experience <= 1) {
      tdRole.innerText = "Trainee";
    } else if (element.experience >= 2 && element.experience <= 5) {
      tdRole.innerText = "Junior";
    } else {
      tdRole.innerText = "Senior";
    }

    tdName.innerText = element.name;
    tdId.innerText = element.id;
    tdDept.innerText = element.department;
    tdEmail.innerText = element.mail;
    tdExperience.innerText = element.experience;
    tdContact.innerText = element.contact;

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
    let deleteButton = document.querySelectorAll("td > button");

  for (let element of deleteButton) {
    element.style.backgroundColor = "red";
  }
  });
    
  let tableEL = document.querySelector("table");

  tableEL.addEventListener("click",function(e){
    if(!e.target.classList.contains("deleteBtn")){
      console.log(e.target.classList)
      return;
    }
    console.log(e.target.classList)
    const btn = e.target;
    btn.closest("tr").remove();
  });
  doctorName
doctorId
doctorDept
doctorExperience
doctorEmail
doctorMobile
});


