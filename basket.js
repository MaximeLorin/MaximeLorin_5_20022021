const buttonBasket= document.getElementById("product__container__button--add");
const numberBasket= document.getElementById("basketNumber");

let retrieveProduct= localStorage.getItem("panier");

let arrayProduct=[];
//console.log(retrieveProduct);

if (retrieveProduct){
    arrayProduct=JSON.parse(retrieveProduct);
}

numberBasket.textContent=arrayProduct.length;
//console.log(arrayProduct);

buttonBasket.addEventListener("click",() => {
    addBasket();
});

if (retrieveProduct=== null && arrayProduct.length===0){
    numberBasket.style.visibility= "hidden";
}

function addBasket(){
    arrayProduct.push(checkUrl());
    localStorage.setItem("panier", JSON.stringify(arrayProduct));
    if (arrayProduct.length!= 0){
        numberBasket.style.visibility= "visible";
    }
    numberBasket.textContent=arrayProduct.length;

}

function checkUrl(){
    let currentId= new URLSearchParams(window.location.search);
    
    if (currentId.has("id")){
        let prodId= currentId.get("id")
        return prodId;
    }
}



function sortArray(basket){
    let numb=1;
    let basketPage=[];
    let art1=basket[0];
    basketPage.push(art1);
    for (let product in basket){
        numb++;
        console.log(art1);
        if (basket[product]!= art1){
            basketPage.push(basket[product]);
            console.log(basketPage)
        }
    }    
}

function createBasket()
{
    const newBasket= document.createElement("div");
    newBasket.id= "basket";
    newBasket.classList.add("basket");
    
    
    const newImage= document.createElement("img");
    newImage.classList.add("basket__img");
    newImage.id= "basket__img";
    newImage.src= objArticle.imageUrl;

    const newDescription= document.createElement("div");
    newDescription.classList.add("basket__description");
    newDescription.id= "basket__description";
    newDescription.textContent = objArticle.description;

    const newPrice= document.createElement("h2");
    newPrice.classList.add("basket__price");
    newPrice.id= "basket__price";
    newPrice.textContent = objArticle.price/100+" €";

    const newName= document.createElement("h3");
    newName.classList.add("basket__name");
    newName.id= "basket__name";
    newName.textContent=objArticle.name;

    newArticle.append(newImage);
    newArticle.append(newPrice);
    newArticle.append(newName);
    newArticle.append(newDescription);
    
    document.getElementById("content").appendChild(newBasket);
}

