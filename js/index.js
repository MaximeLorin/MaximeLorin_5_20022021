// module.exports = createArticles;

getElements();

function createArticles(article) {
  const newArticle = document.createElement("a");
  newArticle.id = "article";
  newArticle.classList.add("article");
  newArticle.href = "/produit.html" + "?id=" + article._id;

  const newImage = document.createElement("img");
  newImage.classList.add("article__img");
  newImage.id = "article__img";
  newImage.src = article.imageUrl;

  const newPrice = document.createElement("h2");
  newPrice.classList.add("article__price");
  newPrice.id = "article__price";
  newPrice.textContent = article.price / 100 + " €";

  const newName = document.createElement("h3");
  newName.classList.add("article__name");
  newName.id = "article__name";
  newName.textContent = article.name;

  const newDescription = document.createElement("p");
  newDescription.classList.add("article__descrptn");
  newDescription.id = "article__descrptn";
  newDescription.textContent = article.description;

  newArticle.append(newImage);
  newArticle.append(newPrice);
  newArticle.append(newName);
  newArticle.append(newDescription);

  document.getElementById("content").appendChild(newArticle);
}

async function getElements() {
  fetch("http://localhost:3000/api/cameras")
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error();
      }
    })
    .then((articles) => {
      console.log(articles);
      for (let article in articles) {
        let art = articles[article];
        createArticles(art);
      }
    })
    .catch((err) => (document.location.href = "/404.html"));
}
