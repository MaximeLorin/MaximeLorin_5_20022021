const orderId = document.getElementById("order__id");
const orderPrice = document.getElementById("order__price");
const orderReturn = document.getElementById("order__return");

orderPrice.textContent = localStorage.getItem("total") + "€";
orderId.textContent = localStorage.getItem("id commande");

orderReturn.addEventListener("click", () => {
  localStorage.clear();
});
