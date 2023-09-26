let apiKey = "8992ed0b";
let enteredMovie = document.querySelector("input");
let searchButton = document.querySelector("button");
let displayArea = document.querySelector("#navBar+ div");
searchButton.addEventListener("click", () => {
  displayArea.innerHTML = "";
  let endpoint = `https://www.omdbapi.com/?apikey=${apiKey}&s=${enteredMovie.value}`;
  async function request() {
    let response = await fetch(endpoint);
    let fetchedData = await response.json();
    renderMovies(fetchedData.Search);
  }
  request();
});
function renderMovies(data) {
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
}
