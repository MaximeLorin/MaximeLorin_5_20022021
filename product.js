getProduct();
let product={};

function checkUrl(){
    let currentId= new URLSearchParams(window.location.search);
    
    if (currentId.has("id")){
        let prodId= currentId.get("id")
        return prodId;
    }
}

function createProduct(){
    image= document.getElementById("product__img");
    image.src= product.imageUrl;

    price= document.getElementById("product__price");
    price.textContent = product.price/100+" €";

    namePro= document.getElementById("product__name");
    namePro.textContent = product.name;

    description= document.getElementById("product__description");
    description.textContent = product.description;
    
    let lenseTab= product.lenses;
    
    for (let lense in lenseTab){
        //console.log(lense)
        const newOption= document.createElement("option");
        //console.log(newOption);
        newOption.textContent= lenseTab[lense];
        document.getElementById("product__select").appendChild(newOption)
    }
}

function getProduct(){
    fetch ("http://localhost:3000/api/cameras/"+checkUrl())
        .then(response =>response.json())
        .then(data =>{
            product= data;
            createProduct(product);
            //console.log(product);
        })
        .catch(error => alert(error))
} 
 

