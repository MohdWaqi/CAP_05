async function requestData() {
  let res = await fetch("https://jsonplaceholder.typicode.com/todos");
  let data = await res.json();
  displayData(data);
  console.log(data);
}

const displayData = (tasks) => {
  let showData = document.getElementById("display");
  tasks.forEach(({ id, title, completed }) => {
    let row = document.createElement("tr");
    let showId = document.createElement("td");
    let showTitle = document.createElement("td");
    let showStatus = document.createElement("td");
    showId.innerText = id;
    showTitle.innerText = title;
    showStatus.innerText = completed;
    row.append(showId, showTitle, showStatus);
    showData.append(row);
  });
};
requestData();
