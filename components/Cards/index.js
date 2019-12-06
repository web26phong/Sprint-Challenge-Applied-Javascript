// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios.get("https://lambda-times-backend.herokuapp.com/articles")
    .then(response => {
        const articleValues = Object.values(response.data.articles);
        articleValues.forEach(item => {
            item.forEach(thing => {
                document.querySelector(".cards-container").append(createCard(thing));
            })
        })
    })
    .catch(error => {
        console.log("The data was not returned.", error);
    })

function createCard(articles){
    const card = document.createElement("div");
    const headline = document.createElement("div");
    const author = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("span");

    card.classList.add("card");
    headline.classList.add("headline");
    author.classList.add("author");
    imgContainer.classList.add("img-container");

    headline.textContent = articles.headline;
    img.src = articles.authorPhoto;
    name.textContent = `By: ${articles.authorName}`;

    imgContainer.append(img);
    author.append(imgContainer, name);
    card.append(headline, author);

    return card;
}