let searchButton = document.querySelector("button");
let sortButton = document.querySelector("button + button");
let searchInput = document.querySelector("input");
let sortSymbol = document.querySelector("span");
let display = document.getElementById("display");
let search = false;

async function requestData() {
  let searchData;
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  searchButton.addEventListener("click", () => {
    display.innerHTML = "";
    search = true;
    searchData = data.filter((singleData) =>
      singleData.title.toLowerCase().includes(searchInput.value)
    );
    displayData(searchData);
  });
  if (!search) displayData(data);
  sortButton.addEventListener("click", () => {
    let sortData;
    let sortingOn = search ? searchData : data;
    display.innerHTML = "";
    if (sortSymbol.innerText == "▲") {
      sortSymbol.innerText = "▼";
      sortData = sortingOn.sort((a, b) => {
        const firstTitle = a.title.toLowerCase();
        const secondTitle = b.title.toLowerCase();
        if (firstTitle < secondTitle) {
          return -1;
        } else if (firstTitle > secondTitle) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(sortData);
    } else {
      sortSymbol.innerText = "▲";
      sortData = sortingOn.sort((a, b) => {
        const firstTitle = a.title.toLowerCase();
        const secondTitle = b.title.toLowerCase();
        if (firstTitle < secondTitle) {
          return 1;
        } else if (firstTitle > secondTitle) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    displayData(sortData);
    console.log(sortData);
  });
}

function displayData(data) {
  data.forEach((element) => {
    let productCard = document.createElement("div");
    let innerCard = document.createElement("div");
    let productImage = document.createElement("img");
    let productCategory = document.createElement("h5");
    let productTitle = document.createElement("h4");
    let productPrice = document.createElement("h2");
    let productDescription = document.createElement("p");
    let productRating = document.createElement("p");

    productImage.src = element.image;
    productCategory.innerText = element.category;
    productTitle.innerText = element.title;
    productPrice.innerText = `₹ ${element.price}`;
    productDescription = element.description.substring(0, 20) + "...";
    productRating.innerText =
      "⭐".repeat(element.rating.rate) + ` (${element.rating.count})`;

    innerCard.append(
      productCategory,
      productImage,
      productTitle,
      productRating,
      productPrice,
      productDescription
    );

    productCard.append(innerCard);
    display.append(productCard);
  });
}
requestData();
