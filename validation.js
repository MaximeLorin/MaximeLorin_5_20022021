let orderId = document.getElementById("order__id");
let orderPrice = document.getElementById("order__price");

orderPrice.textContent = localStorage.getItem("total") + " €";
orderId.textContent = localStorage.getItem("id commande");
