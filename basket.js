const buttonBasket= document.getElementById("product__container__button--add");

let arrayProduct=[];
//console.log(arrayProduct);

buttonBasket.addEventListener("click",() => {
    addBasket();
});

function addBasket(){
    
    arrayProduct.push(checkUrl());
    console.log(arrayProduct);

}

function checkUrl(){
    let currentId= new URLSearchParams(window.location.search);
    
    if (currentId.has("id")){
        let prodId= currentId.get("id")
        return prodId;
    }
}



