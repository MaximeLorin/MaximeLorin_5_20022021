const orderId = document.getElementById("order__id");
const orderPrice = document.getElementById("order__price");
const orderReturn = document.getElementById("order__return");
let myStorage = localStorage;

redirectClient();
validOrder();

function validOrder() {
  orderPrice.textContent = myStorage.getItem("total") + "€";
  orderId.textContent = myStorage.getItem("id commande");
  console.log(myStorage);

  localStorage.clear();
}

function redirectClient() {
  if (myStorage.length === 0) {
    document.location = "/index.html";
  }
}
