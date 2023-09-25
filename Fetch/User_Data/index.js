let masterDisplay = document.getElementById("root");
let fetchButton = document.querySelector("#root > button");
let endpoint = "https://reqres.in/api/users";
fetchButton.addEventListener("click", () => {
  fetchButton.style.display = "none";
  fetch(endpoint)
    .then((response) => response.json())
    .then((inProcess) => {
      let userData = inProcess.data;
      userData.map((element) => {
        let userCard = document.createElement("div");
        let userImage = document.createElement("img");
        let userName = document.createElement("h2");
        let userEmail = document.createElement("p");
        userImage.src = element.avatar;
        userName.innerText = `${element.first_name} ${element.last_name}`;
        userEmail.innerText = element.email;
        userCard.append(userImage, userName, userEmail);
        masterDisplay.append(userCard);
      });
    })
    .catch((error) => {
      console.log(error);
      let errorMessage = document.createElement("div");
      let message = document.createElement("h2");
      message.innerText = "! 500 Internal Server Error";
      errorMessage.append(message);
      masterDisplay.append(errorMessage);
    });
});
