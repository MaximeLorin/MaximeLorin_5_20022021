let image= document.getElementById("article__img");
let price= document.getElementById("article__price");
let description= document.getElementById("article__descrptn");

price.textContent = "100 €"

function getElements(){
    return fetch ("http://localhost:3000/api/cameras")
        .then(response => response.json())
        console.log(response);
}