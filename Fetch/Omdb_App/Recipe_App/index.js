let display = document.querySelector("#navBar + div");
let endpoint = "https://www.themealdb.com/api/json/v1/1/categories.php";
let searchButton = document.querySelector(
  "#navBar>:first-child>:last-child>:last-child"
);
let initialNavBar = document.querySelector("#navBar>:first-child");
let searchNavBar = document.querySelector("#navBar>:last-child");
let closeSearch = document.querySelector("#navBar>:last-child >div > button");
let userInput = document.querySelector("input");
let suggesionDisplay = document.querySelector(".foods");

// ------------------------------------------Getting data of searched or clicked food in suggestion------------------------------------
async function searchFood(userFood, fromInput = 1) {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${userFood}`
    );
    let data = await res.json();
    if (fromInput === 0) {
      renderFood(data.meals[0]);
    } else {
      displaySuggession(data.meals);
    }
  } catch (error) {
    suggesionDisplay.innerHTML = "";
  }
}
// -------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------displaying suggession after user searched in search bar----------------------------------------
function displaySuggession(data) {
  {
    suggesionDisplay.innerHTML = "";
    if (userInput.value != "") {
      for (let food of data) {
        let foodSection = document.createElement("div");
        let image = document.createElement("img");
        let foodName = document.createElement("h4");
        image.src = food.strMealThumb;
        foodName.innerText = food.strMeal;
        foodSection.append(image, foodName);
        suggesionDisplay.append(foodSection);
      }
    }
    // -------------------------------------------------------making each items clickable--------------------------------------------------------
    let foodOptions = document.querySelectorAll(".foods > div");
    for (let foodOption of foodOptions) {
      foodOption.addEventListener("click", () => {
        initialNavBar.style.display = "flex";
        searchNavBar.style.display = "none";
        userInput.value = "";
        let foodName = foodOption.querySelector("h4").innerText;
        searchFood(foodName, 0);
      });
    }
    // ----------------------------------------------------------------------------------------------------------------------------------------------
  }
}
// ----------------------------------------------------------------------------------------------------------------------------------------------

function renderFood(data) {
  display.innerHTML = "";
  let title = document.createElement("h1");
  let image = document.createElement("img");
  let ingredients = document.createElement("h3");
  let instructionHeading = document.createElement("h3");
  let instructions = document.createElement("p");
  title.innerText = data.strMeal;
  image.src = data.strMealThumb;
  ingredients.innerHTML = "Ingredients : ";
  instructionHeading.innerText = "Instructions :";
  for (let i = 1; i <= 20; i++) {
    let current = data[`strIngredient${i}`];
    ingredients.innerText += current;
    if (current != "") {
      if (i != 20) ingredients.innerText += ", ";
    } else {
      break;
    }
  }
  instructions.innerText = data.strInstructions;

  display.append(title, image, ingredients, instructionHeading, instructions);
}

// ------------------------------------------------------- Throttling during typing in input field----------------------------------------------
function throttling(proceed, delay) {
  let interval = true;
  function sugession(query) {
    if (interval) {
      interval = false;
      proceed(query);
      setTimeout(() => {
        interval = true;
      }, delay);
    }
  }
  return sugession;
}
let searchSuggession = throttling(searchFood, 500);
// ----------------------------------------------------------------------------------------------------------------------------------------------

userInput.addEventListener("input", function () {
  let search = userInput.value;
  searchSuggession(search);
});

searchButton.addEventListener("click", function () {
  initialNavBar.style.display = "none";
  searchNavBar.style.display = "block";
});
closeSearch.addEventListener("click", function () {
  initialNavBar.style.display = "flex";
  searchNavBar.style.display = "none";
});
async function getRecipe() {
  try {
    let res = await fetch(endpoint);
    let data = await res.json();
    displayData(data.categories);
  } catch (error) {
    console.log(error);
  }
}
getRecipe();

function displayData(data) {
  let image = document.createElement("img");
  let label = document.createElement("h1");
  label.innerText = "Popular Categories";
  image.src =
    "https://w0.peakpx.com/wallpaper/906/293/HD-wallpaper-chocolate-desserts-chocolate-sweets-desserts-strawberry.jpg";
  let categories = document.createElement("div");
  for (let food of data) {
    let card = document.createElement("div");
    let categoryImage = document.createElement("img");
    let heading = document.createElement("h3");
    categoryImage.src = food.strCategoryThumb;
    heading.textContent = food.strCategory;
    card.append(categoryImage, heading);
    categories.append(card);
  }

  display.append(image, label, categories);
}
