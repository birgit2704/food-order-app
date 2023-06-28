import { menuArray } from "./data.js";

let orderedArray = [];
let totalPrice = 0;
const foodOptionBtns = document.querySelectorAll(".food-option-btn");

document
  .getElementById("general-container")
  .addEventListener("click", handleClick);

document.querySelector("form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const userName = document.getElementById("name").value;
  document.getElementById("modal").style.display = "none";
  document.getElementById("general-container").style.backgroundColor = "white";

  const btns = document.querySelectorAll(".food-option-btn");
  console.log(btns);
  btns.forEach((button) => {
    button.style.backgroundColor = "white";
    button.disabled = true;
  });
  document.getElementById("order-container").innerHTML = `
    <div >
    <p class="thanks" id="thanks">Thanks, ${userName}! Your order is on its way!</p>
  </div></p>`;
}

function handleClick(e) {
  //add food item
  if (e.target.id === "food-option-btn") {
    document.getElementById("order-container").style.display = "flex";
    let foodObj = menuArray[e.target.dataset.id];
    orderedArray.push(foodObj);
    updateTotalPrice();
    renderOrderedFoodArray(orderedArray);
  }

  //remove food item
  if (e.target.id === "order-remove-btn") {
    const nameItemToBeDeleted = menuArray[e.target.dataset.id].name;
    orderedArray = orderedArray.filter((el) => el.name !== nameItemToBeDeleted);
    updateTotalPrice();
    renderOrderedFoodArray(orderedArray);
  }

  //complete order
  if (e.target.id === "complete-order") {
    document.getElementById("modal").style.display = "block";
    document.getElementById("general-container").style.backgroundColor =
      "lightgrey";
    document;
    const btns = document.querySelectorAll(".food-option-btn");
    console.log(btns);
    btns.forEach((button) => {
      button.style.backgroundColor = "lightgrey";
      button.disabled = true;
    });
  }
}

function renderOrderedFoodArray(arr) {
  let innerHtmlOrder = "";
  arr.forEach(function (food) {
    innerHtmlOrder += `
              <div class="ordered-food">
                  <h2 data-id=${food.name}>${food.name}</h2>
                  <button class="order-remove-btn" id="order-remove-btn" data-id="${food.id}">remove</button>
                  <h2 class="order-price">$${food.price}</h2>
              </div>
          `;
  });

  document.getElementById("order-details").innerHTML = innerHtmlOrder;
}

function updateTotalPrice() {
  if (orderedArray.length === 0) {
    totalPrice = 0;
  } else {
    totalPrice = orderedArray
      .map((el) => el.price)
      .reduce((sum, el) => sum + el);
  }
  document.getElementById("order-total-price").innerHTML = `$${totalPrice}`;
}

function renderMenuItems() {
  let innerHtml = "";

  menuArray.forEach(function (food) {
    innerHtml += `
        <div class="food-option">
          <img class="emoji" src="./images/${food.emoji}"/>
          <div class="food-option-text">
            <h2>${food.name}</h2>
            <p>${food.ingredients}</p>
            <h4>$${food.price}</h4>
          </div>
          <button class="food-option-btn" id="food-option-btn" data-id="${food.id}">+</button>
        </div>
`;
  });
  document.getElementById("food-container").innerHTML = innerHtml;
}
renderMenuItems();
