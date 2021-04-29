let article= document.getElementById("article");

class objArticle{
    constructor(description,imageUrl,Lenses,name,price,_id){
        this.Lenses= [];
        this._id=_id;
        this.name=name;
        this.description=description;
        this.price=0;
        this.imageUrl=imageUrl;
    }
}

getElements();

function createArticles()
{
    const newArticle= document.createElement("a");
    newArticle.id= "article";
    newArticle.classList.add("article");
    newArticle.href= "/produit.html"+"?id="+objArticle._id;
    
    const newImage= document.createElement("img");
    newImage.classList.add("article__img");
    newImage.id= "article__img";
    newImage.src= objArticle.imageUrl;

    const newPrice= document.createElement("h2");
    newPrice.classList.add("article__price");
    newPrice.id= "article__price";
    newPrice.textContent = objArticle.price/100+" €";

    const newName= document.createElement("h3");
    newName.classList.add("article__name");
    newName.id= "article__name";
    newName.textContent=objArticle.name;

    const newDescription= document.createElement("p");
    newDescription.classList.add("article__descrptn");
    newDescription.id= "article__descrptn";
    newDescription.textContent = objArticle.description;

    newArticle.append(newImage);
    newArticle.append(newPrice);
    newArticle.append(newName);
    newArticle.append(newDescription);
    
    document.getElementById("content").appendChild(newArticle);
}

function getElements(){
    fetch ("http://localhost:3000/api/cameras")
        .then(response =>response.json())
        .then(data =>{
            for (let article in data){
                objArticle=data[article];
                createArticles();               
            }
        })
        .catch(error => alert(error))
} 


