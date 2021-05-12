const buttonBasket= document.getElementById("product__container__button--add");
const numberBasket= document.getElementById("basketNumber");

const buttonForm= document.getElementById("form__button");
const firstName= document.getElementById("form__firstName");
const lastName= document.getElementById("form__lastName");
const adress= document.getElementById("form__adress");
const city= document.getElementById("form__city");
const email= document.getElementById("form__email");

let retrieveProduct= localStorage.getItem("panier");

let arrayProduct=[];

if (retrieveProduct){
    arrayProduct=JSON.parse(retrieveProduct);
}

numberBasket.textContent=arrayProduct.length;

if (buttonBasket){
    buttonBasket.addEventListener("click",() => {
        addBasket();
    });
}

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
    basket.sort();
    let basketPage=[];
    let numb= 0;
    let numbProducts=[];
    let art1=basket[0];
    basketPage.push(art1);
    console.log(arrayProduct);
    for (let product in basket){
        numb++;

        console.log(numbProducts);
        if (basket[product]!= art1){
            numbProducts.push(numb-1);

            basketPage.push(basket[product]);
            art1=basket[product];
            numb=1;
        }
    }
    
    return basketPage;   
}

function createBasket(basketArticle)
{
    const newBasket= document.createElement("div");
    newBasket.id= "basket";
    newBasket.classList.add("basket");
    
    
    const newImage= document.createElement("img");
    newImage.classList.add("basket__img");
    newImage.id= "basket__img";
    newImage.src= basketArticle.imageUrl;

    const newDescription= document.createElement("div");
    newDescription.classList.add("basket__description");
    newDescription.id= "basket__description";

    const newPrice= document.createElement("h2");
    newPrice.classList.add("basket__price");
    newPrice.id= "basket__price";
    newPrice.textContent = basketArticle.price/100+" €";

    const newName= document.createElement("h3");
    newName.classList.add("basket__name");
    newName.id= "basket__name";
    newName.textContent=basketArticle.name;

    const newQuantity= document.createElement("div");
    newQuantity.classList.add("basket__quantity");
    newQuantity.id= "basket__quantity";

    const newQuantityPlus= document.createElement("button");
    newQuantityPlus.classList.add("basket__quantity--plus");
    newQuantityPlus.id= "basket__quantity--plus";
    newQuantityPlus.textContent= "+";

    const newQuantityMinus= document.createElement("button");
    newQuantityMinus.classList.add("basket__quantity--minus");
    newQuantityMinus.id= "basket__quantity--minus";
    newQuantityMinus.textContent= "-";

    const newQuantityNumber= document.createElement("p");
    newQuantityNumber.classList.add("basket__quantity--number");
    newQuantityNumber.id= "basket__quantity--number";

    newBasket.append(newImage);
    newBasket.append(newPrice);
    
    newBasket.append(newDescription);
    newDescription.append(newName);
    newDescription.append(newPrice);

    newBasket.append(newQuantity);
    newQuantity.append(newQuantityPlus);
    newQuantity.append(newQuantityNumber);
    newQuantity.append(newQuantityMinus);
    
    
    document.getElementById("content").appendChild(newBasket);
}


let actUrl= window.location.href;

if (actUrl === "http://127.0.0.1:5500/panier.html"){
    let sortArticles= sortArray(arrayProduct);
    console.log(sortArticles);
    for (article in sortArticles){
        fetch ("http://localhost:3000/api/cameras/"+sortArticles[article])
        .then(response =>response.json())
        .then(product =>{
            createBasket(product)
        })
        .catch(()=> document.location.href="/404.html")
    }
}

let toPost={
    contact:{
        firstName:"str",
        lastName:"str",
        address:"adress.value",
        city:"city.value",
        email:"email.value",
    },
    products: sortArray(arrayProduct)
};


buttonForm.addEventListener("click",() => {

    fetch ("http://localhost:3000/api/cameras/order",{method:"post",
     body:JSON.stringify(toPost),
     headers:{"Content-Type":"application/json"}})
        .then(order =>order.json())
        .then(data =>{
            console.log(data);
        })
        .catch(()=> document.location.href="/404.html")
});
