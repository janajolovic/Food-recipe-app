const searchBtn = document.querySelector(".search-btn");
const mealList = document.querySelector(".meal");
const mealDetailContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector(".close-btn");

searchBtn.addEventListener("click", getMealList);


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
            }
            mealList.innerHTML = html;
        })
}