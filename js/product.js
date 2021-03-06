getId();

function checkId() {
  let currentId = new URLSearchParams(window.location.search);

  if (currentId.has("id")) {
    let prodId = currentId.get("id");
    return prodId;
  }
}

function createProduct(product) {
  image = document.getElementById("product__img");
  image.src = product.imageUrl;

  price = document.getElementById("product__price");
  price.textContent = product.price / 100 + " €";

  namePro = document.getElementById("product__name");
  namePro.textContent = product.name;

  description = document.getElementById("product__description");
  description.textContent = product.description;

  let lenseTab = product.lenses;

  for (let lense in lenseTab) {
    const newOption = document.createElement("option");
    newOption.textContent = lenseTab[lense];
    document.getElementById("product__select").appendChild(newOption);
  }
}

function getId() {
  fetch("http://localhost:3000/api/cameras/" + checkId())
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((product) => {
      createProduct(product);
    })
    .catch((err) => (document.location.href = "/404.html"));
}
