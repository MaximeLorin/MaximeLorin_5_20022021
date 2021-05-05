const buttonBasket= document.getElementById("product__container__button--add");
const numberBasket= document.getElementById("basketNumber");

let retrieveProduct= JSON.parse(localStorage.getItem("panier"));

let arrayProduct=[];
localStorage.setItem("panier", JSON.stringify(arrayProduct));



console.log(retrieveProduct);
if (arrayProduct.length ===0){
    arrayProduct=retrieveProduct;
}



buttonBasket.addEventListener("click",() => {
    addBasket();
});

function addBasket(){
    arrayProduct.push(checkUrl());
    localStorage.setItem("panier", JSON.stringify(arrayProduct));
    
    numberBasket.textContent=retrieveProduct.length;
    //console.log(arrayProduct);
}

function checkUrl(){
    let currentId= new URLSearchParams(window.location.search);
    
    if (currentId.has("id")){
        let prodId= currentId.get("id")
        return prodId;
    }
}



