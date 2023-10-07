let apiKey = "8992ed0b";
let enteredMovie = document.querySelector("input");
let searchButton = document.querySelector("button");
let displayArea = document.querySelector("#navBar+ div >div");
let displayError = document.querySelector("#navBar+ div :last-child");
searchButton.addEventListener("click", () => {
  displayArea.innerHTML = "";
  let endpoint = `https://www.omdbapi.com/?apikey=${apiKey}&s=${enteredMovie.value}`;
  async function request() {
    try {
      let response = await fetch(endpoint);
      let fetchedData = await response.json();
      renderMovies(fetchedData.Search);
    } catch (error) {
      displayArea.innerHTML = "";
      displayError.innerHTML = "";
      displayError.innerHTML = "<h1>Please Check Your Connection.</h1>";
    }
  }
  request();
});
function renderMovies(data) {
  if (data) {
    displayError.innerHTML = "";
    data.map((element, index) => {
      let movieCard = document.createElement("div");
      let image = document.createElement("img");
      image.src = element.Poster;
      let release = document.createElement("h4");
      release.innerText = `Released: ${element.Year}`;
      let movieName = document.createElement("h4");
      movieName.innerText = `${index + 1}. ${element.Title}`;
      movieCard.append(image, release, movieName);
      displayArea.append(movieCard);
      console.log(data);
    });
  } else {
    displayError.innerHTML = "";
    displayError.innerHTML = "<h1>No Movie Found...</h1>";
  }
}
