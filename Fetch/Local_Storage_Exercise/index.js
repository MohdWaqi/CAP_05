let form = document.querySelector("form");
let getData = document.querySelector("#display > button");
let tbody = document.querySelector("tbody");
form.addEventListener("submit", function (event) {
  let enteredName = event.target.name.value;
  let enteredAge = event.target.age.value;
  if (enteredAge !== "" && enteredName !== "") {
    localStorage.setItem("name", enteredName);
    localStorage.setItem("age", enteredAge);
  }
});
getData.addEventListener("click", () => {
  let data = document.createElement("tr");
  let name = document.createElement("td");
  let age = document.createElement("td");
  name.innerText = localStorage.getItem("name");
  age.textContent = localStorage.getItem("age");
  data.append(name, age);
  tbody.append(data);
  console.log(localStorage.getItem("name"));
});
