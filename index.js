let image= document.getElementById("article__img");
let price= document.getElementById("article__price");
let description= document.getElementById("article__descrptn");
let content= document.getElementById("content");

let listdata={
    Lenses:[],
    _id:0,
    name:"",
    description:"",
    price:0,
    imageUrl:"",
};



getElements();

function createArticles()
{
    const newArticle =document.createElement("div");
    newArticle.id= "article";
    newArticle.classList.add("article");

    const newImage= document.createElement("img");
    newImage.classList.add("article__img");
    newImage.id= "article__img";

    const newPrice= document.createElement("h2");
    newPrice.classList.add("article__price");
    newPrice.id= "article__price";

    const newDescription= document.createElement("p");
    newDescription.classList.add("article__descrptn");
    newDescription.id= "article__descrptn";

    newArticle.append(newImage);
    newArticle.append(newPrice);
    newArticle.append(newDescription);
    
    document.getElementById("content").appendChild(newArticle);
    
    price.textContent = listdata.price/100+" €";
}

function getElements(){
    fetch ("http://localhost:3000/api/cameras")
        .then(response =>response.json())
        .then(data =>{
            console.log(data)
            for (let article in data){
                listdata=data[article];
                createArticles();
                image.src= listdata.imageUrl;
                
                description.textContent = listdata.description;
                console.log(listdata)
            }
            
        })
} 


