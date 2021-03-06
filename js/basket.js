//------
const buttonBasket = document.getElementById("product__container__button--add");
const numberBasket = document.getElementById("basketNumber");
const buttonDirectBuy = document.getElementById(
  "product__container__button--buy"
);
//------
const buttonForm = document.getElementById("form__button");
let firstName = document.getElementById("form__firstName");
let lastName = document.getElementById("form__lastName");
let adress = document.getElementById("form__adress");
let city = document.getElementById("form__city");
let email = document.getElementById("form__email");

let priceArticles = 0;
const totalPrice = document.getElementById("total__price");

//---------
let retrieveProduct = localStorage.getItem("panier");

let arrayProduct = [];

if (retrieveProduct) {
  arrayProduct = JSON.parse(retrieveProduct);
}

numberBasket.textContent = arrayProduct.length;

if (buttonBasket) {
  buttonBasket.addEventListener("click", () => {
    addBasket(checkId());
  });
}

if (buttonDirectBuy) {
  buttonDirectBuy.addEventListener("click", () => {
    addBasket(checkId());
    document.location.href = "/panier.html";
  });
}

if (arrayProduct.length < 1) {
  numberBasket.style.visibility = "hidden";
}

function addBasket(id) {
  arrayProduct.push(id);
  localStorage.setItem("panier", JSON.stringify(arrayProduct));
  if (arrayProduct.length != 0) {
    numberBasket.style.visibility = "visible";
  }
  numberBasket.textContent = arrayProduct.length;
}

function removeBasket(basket, id) {
  let index = basket.indexOf(id);
  if (index > -1) {
    basket.splice(index, 1);
  }
  localStorage.setItem("panier", JSON.stringify(basket));
  return basket;
}

function checkId() {
  let currentId = new URLSearchParams(window.location.search);

  if (currentId.has("id")) {
    let prodId = currentId.get("id");
    return prodId;
  }
}

function sortArray(basket) {
  basket.sort();
  let basketPage = [];
  let art1 = basket[0];
  basketPage.push(art1);
  for (let product in basket) {
    if (basket[product] != art1) {
      basketPage.push(basket[product]);
      art1 = basket[product];
    }
  }
  return basketPage;
}
//-----
let numbProducts = {};

arrayProduct.forEach((prod) => {
  numbProducts[prod] = (numbProducts[prod] ?? 0) + 1;
});

let quantityProduct = Object.values(numbProducts);
//-----

function createBasket(basketArticle, number) {
  const newBasket = document.createElement("div");
  newBasket.id = "basket";
  newBasket.classList.add(basketArticle._id);

  const newImage = document.createElement("img");
  newImage.classList.add("basket__img");
  newImage.id = "basket__img";
  newImage.src = basketArticle.imageUrl;

  const newDescription = document.createElement("div");
  newDescription.classList.add("basket__description");
  newDescription.id = "basket__description";

  const newPrice = document.createElement("h2");
  newPrice.classList.add("basket__price");
  newPrice.id = "basket__price";
  newPrice.textContent = basketArticle.price / 100 + " ???";

  const newName = document.createElement("h3");
  newName.classList.add("basket__name");
  newName.id = "basket__name";
  newName.textContent = basketArticle.name;

  const newQuantity = document.createElement("div");
  newQuantity.classList.add("basket__quantity");
  newQuantity.id = "basket__quantity";

  const newQuantityPlus = document.createElement("button");
  newQuantityPlus.classList.add("basket__quantity--plus");
  newQuantityPlus.id = "basket__quantity--plus";
  newQuantityPlus.textContent = "+";

  newQuantityPlus.addEventListener("click", () => {
    addBasket(basketArticle._id);
    newQuantityNumber.textContent++;
    priceArticles = priceArticles + basketArticle.price / 100;
    localStorage.setItem("total", priceArticles);
    totalPrice.textContent = priceArticles + " ???";
  });

  const newQuantityMinus = document.createElement("button");

  newQuantityMinus.classList.add("basket__quantity--minus");
  newQuantityMinus.id = "basket__quantity--minus";
  newQuantityMinus.textContent = "-";

  newQuantityMinus.addEventListener("click", () => {
    removeBasket(arrayProduct, basketArticle._id);
    newQuantityNumber.textContent--;
    numberBasket.textContent = arrayProduct.length;
    number--;
    priceArticles = priceArticles - basketArticle.price / 100;
    totalPrice.textContent = priceArticles + " ???";
    localStorage.setItem("total", priceArticles);
    if (number < 1) {
      document.location.reload();
    }
  });

  const newQuantityNumber = document.createElement("p");
  newQuantityNumber.classList.add("basket__quantity--number");
  newQuantityNumber.id = "basket__quantity--number";
  newQuantityNumber.textContent = number;

  let calcul = (newQuantityNumber.textContent * basketArticle.price) / 100;
  priceArticles = calcul + priceArticles;
  totalPrice.textContent = priceArticles + " ???";
  localStorage.setItem("total", priceArticles);

  newBasket.append(newImage);
  newBasket.append(newPrice);

  newBasket.append(newDescription);
  newDescription.append(newName);
  newDescription.append(newPrice);

  newBasket.append(newQuantity);
  newQuantity.append(newQuantityPlus);
  newQuantity.append(newQuantityNumber);
  newQuantity.append(newQuantityMinus);

  document.getElementById("basketContainer").appendChild(newBasket);
}

let actUrl = window.location.href;

if (actUrl === "http://127.0.0.1:5500/panier.html" && arrayProduct.length > 0) {
  let sortArticles = sortArray(arrayProduct);
  for (article in sortArticles) {
    let indiNumber = quantityProduct[article];
    fetch("http://localhost:3000/api/cameras/" + sortArticles[article])
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((product) => {
        createBasket(product, indiNumber);
      })
      .catch((err) => (document.location.href = "/404.html"));
  }
}

function postElements(postObj) {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "post",
    body: JSON.stringify(postObj),
    headers: { "Content-Type": "application/json" },
  })
    .then((order) => order.json())
    .then((data) => {
      localStorage.setItem("commande", JSON.stringify(data));
      localStorage.setItem("id commande", JSON.stringify(data.orderId));
    })
    .catch(() => (document.location.href = "/404.html"));
}

if (buttonForm) {
  if (arrayProduct.length > 0) {
    buttonForm.disabled = !buttonForm.disabled;
  }
  buttonForm.addEventListener("click", (e) => {
    let toPost = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adress.value,
        city: city.value,
        email: email.value,
      },
      products: sortArray(arrayProduct),
    };

    if (arrayProduct.length != 0) {
      postElements(toPost);
    }
  });
}
