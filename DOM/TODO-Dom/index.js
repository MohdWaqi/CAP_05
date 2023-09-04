const form = document.querySelector("form");
const task = document.getElementById("task");
const priority = document.getElementById("priority");
const tbody = document.querySelector("tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let allTask = [];
  allTask.push({
    taskName: task.value,
    taskPriority: priority.value,
  });
  allTask.map((element) => {
    let tableRow = document.createElement("tr");
    let taskData = document.createElement("td");
    let priorityData = document.createElement("td");
    let favouriteData = document.createElement("td");

    taskData.innerText = element.taskName;
    priorityData.innerText = element.taskPriority;
    tableRow.append(taskData, priorityData, favouriteData);
    return tbody.append(tableRow);
  });

  let row = document.getElementsByTagName("tr");
  for (let i = 0; i < row.length; i++) {
    if (row[i].getElementsByTagName("td")[1]) {
      if (row[i].getElementsByTagName("td")[1].innerHTML === "High") {
        row[i].style.backgroundColor = "red";
      } else {
        row[i].style.backgroundColor = "green";
      }
    }
  }
  task.value = "";
  priority.value = "";
});
