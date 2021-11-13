const searchBtn = document.querySelector(".search-btn");
const mealList = document.querySelector(".meal");
const mealDetailContent = document.querySelector(".meal-details-content");
let MealDetails = document.querySelector(".meal-details")

searchBtn.addEventListener("click", getMealList);

mealList.addEventListener("click", getMealRecipe);



function getMealList() {
    let searchInputText = document.querySelector(".search-bar").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id = ${meal.idMeal}>
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}">
                            </div>
                            <div class="meal-text">
                                <h3>${meal.strMeal}</h3>
                                <a class="recipe-btn" href="">Get recipe</a>
                            </div>
                        </div>
                    `

                })
            } else {
                html += `<h2>Sorry we couldn't find any meals.</h2>`;
            }
            mealList.innerHTML = html;


        })
    }


function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`) 
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let html = ""

                if (data.meals) {
                        html += `
                            <button type="button" class='close-btn'><i class="fas fa-times"></i></button>
                            <div class="meal-details-content">
                                <h2 class="meal-title">${data.meals[0].strMeal}</h2>
                                <p class="meal-category">${data.meals[0].strCategory}</p>
                                <div class="meal-instructions">
                                    <h3>Instructions:</h3>
                                    <p>${data.meals[0].strInstructions}</p>
                                    <div class="recipe-meal-img">
                                        <img src='${data.meals[0].strMealThumb}'>
                                    </div>
                                    <div class="meal-link">
                                        <a href="${data.meals[0].strYoutube}" target="_blank">Watch video</a>
                                    </div>
                                </div>
                            </div>
                        `
                }

                MealDetails.style.display = "block";
                MealDetails.innerHTML = html;
                const recipeCloseBtn = document.querySelector(".close-btn");
                recipeCloseBtn.addEventListener("click", () => {
                    MealDetails.style.display = 'none'
                })
            })
    }
}
