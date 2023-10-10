let apiKey = "8992ed0b";
let enteredMovie = document.querySelector("input");
let searchButton = document.querySelector("button");
let displayArea = document.querySelector("#navBar+ div >div");
let displayError = document.querySelector("#navBar+ div :last-child");


// --------------------------Debouncing to Reduce the unnecessary load on server------------------------------------

function debounce(fetchMovies,delay){
  let timer;
  function enable(movieQuery){
    clearTimeout(timer)
    timer = setTimeout(() =>{
      fetchMovies(movieQuery)
    }, delay)
  }
  return enable
}
let activate = debounce(request, 700);

// --------------------------------------------------------------------------------------------------------

searchButton.addEventListener("click", () => {
  displayArea.innerHTML = "";
  request();
});
enteredMovie.addEventListener("input", () => {
  displayArea.innerHTML = "";
  displayError.innerHTML = "<h1>Loading...</h1>"
  activate(enteredMovie.value);
})

// --------------------------------------------------------Fetching Movie Data--------------------------------------
async function request(query) {
  let endpoint = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  try {
    let response = await fetch(endpoint);
    let fetchedData = await response.json();
    renderMovies(fetchedData.Search);
  } catch (error) {
    displayArea.innerHTML = "";
    displayError.innerHTML = "";
    displayError.innerHTML = "<h1>500 Internal Error.</h1>";
  }
}
// -------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------Display fetched Movies------------------------------------

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
    });
  } else {
    displayError.innerHTML = "";
    displayError.innerHTML = "<h1>No Movie Found...</h1>";
  }
}

// -----------------------------------------------------------------------------------------------------------------------------
