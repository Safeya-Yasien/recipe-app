// main link
// https://www.themealdb.com/api.php

// by category
// https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputRecipe}`;

// by id
// www.themealdb.com/api/json/v1/1/lookup.php?i={id}

let recipeName = document.querySelector(".recipe-name");
let searchButton = document.querySelector(".search-button");
let resultArea = document.querySelector(".result-area");
let recipeDetails = document.querySelector(".recipe-details");

searchButton.addEventListener("click", getRecipe);
resultArea.addEventListener("click", getRecipeDetails);
recipeDetails.addEventListener("click", closeDetails);

function getRecipe() {
  let inputRecipe = recipeName.value.trim();

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputRecipe}`;

  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        resultArea.innerHTML = "No data";
      }
    })
    .then((data) => displayRecipes(data));
}

function displayRecipes(recipes) {
  resultArea.innerHTML = "";

  if (recipes.meals == null) {
    resultArea.id = "no-data";
    resultArea.innerHTML = "No Data";
    return;
  }

  let resultsContainer = document.createElement("div");
  resultsContainer.className = "results";

  recipes.meals.forEach((recipe) => {
    let cardContainer = document.createElement("div");
    cardContainer.className = "card";

    let image = document.createElement("img");
    image.className = "image";
    image.src = `${recipe.strMealThumb}`;
    image.alt = `${recipe.strMeal}`;
    cardContainer.appendChild(image);

    let infoContainer = document.createElement("div");
    infoContainer.className = "info";

    let recipeTitle = document.createElement("h2");
    recipeTitle.className = "title";
    recipeTitle.innerHTML = `${recipe.strMeal}`;

    let recipeLink = document.createElement("a");
    recipeLink.className = "recipe-link";
    recipeLink.innerHTML = "Get Recipe";
    recipeLink.setAttribute("data-id", recipe.idMeal);
    recipeLink.href = "#";

    infoContainer.appendChild(recipeTitle);
    infoContainer.appendChild(recipeLink);

    cardContainer.appendChild(infoContainer);

    resultsContainer.appendChild(cardContainer);
    resultArea.appendChild(resultsContainer);
  });
}

function getRecipeDetails(e) {
  let recipeClass = e.target.classList.contains("recipe-link");

  if (recipeClass) {
    let recipeId = e.target.getAttribute("data-id");

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => displayRecipeDetails(data));
  }
}

function displayRecipeDetails(recipe) {
  recipeDetails.innerHTML = "";
  recipeDetails.classList.remove("show-details");

  let recipeInfo = recipe.meals[0];

  let detailsContainer = document.createElement("div");
  detailsContainer.className = "details";

  let icon = document.createElement("i");
  icon.setAttribute("class", "fa-solid fa-x close");

  let recipeTitle = document.createElement("h2");
  recipeTitle.className = "recipe-title";
  recipeTitle.innerHTML = `${recipeInfo.strMeal}`;

  let recipeInstractions = document.createElement("p");
  recipeInstractions.className = "instractions";
  recipeInstractions.innerHTML = `Instractions:`;

  let recipeDescription = document.createElement("p");
  recipeDescription.className = "description";
  recipeDescription.innerHTML = `${recipeInfo.strInstructions}`;

  let recipeVideo = document.createElement("a");
  recipeVideo.innerHTML = `Watch Video`;
  recipeVideo.href = `${recipeInfo.strYoutube}`;

  detailsContainer.appendChild(icon);
  detailsContainer.appendChild(recipeTitle);
  detailsContainer.appendChild(recipeInstractions);
  detailsContainer.appendChild(recipeDescription);
  detailsContainer.appendChild(recipeVideo);
  recipeDetails.appendChild(detailsContainer);
}

function closeDetails(e) {
  let closeIcon = e.target.classList.contains("close");

  if (closeIcon) {
    recipeDetails.classList.add("show-details");
  }
}
