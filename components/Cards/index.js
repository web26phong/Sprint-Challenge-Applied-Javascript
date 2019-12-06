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
        // console.log(response);
        // console.log(response.data.articles);
        // the object "response.data.articles" becomes an array with each entry being [topic, anotherArray[objects]]
        const articleEntries = Object.entries(response.data.articles);
        // console.log(articleEntries);
        let headline = "someHeadline";
        let authorPhoto = "some url";
        let authorName = "author name";
        // run through every entry in articleEntries array using a for loop.
        // remember: every entry is in the format [topic, arrayOfObjects]
        for (let [topic, arrayOfObjects] of articleEntries){
            arrayOfObjects.forEach(article => {
                // the object "article" becomes an array with each entry being [key, value]
                const articleEntry = Object.entries(article);
                // remember: arrayOfObjects was an array that contained objects. so for each object in the arrayOfObjects array, we convert to an array
                // console.log(articleEntry);
                // run through every entry in articleEntry array using a for loop
                // remember: every entry is in the format [key, value]
                // if a key matches the keyword, we assign it the new value in place of the filler value declared above.
                for (let [key, value] of articleEntry){
                    if (key === "headline"){
                        headline = value;
                    }
                    if (key === "authorPhoto"){
                        authorPhoto = value;
                    }
                    if (key === "authorName"){
                        authorName = value;
                    }
                }
                // once we have obtained values from each article object we run the create component function and pass it arguments, then append it to the "cards-container" class
                document.querySelector(".cards-container").append(createCard(headline, authorPhoto, authorName));
            })
        }
        
    })
    .catch(error => {
        console.log("The data was not returned.", error);
    })

function createCard(headlineParam, photoParam, authorParam){
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

    headline.textContent = headlineParam;
    img.src = photoParam;
    name.textContent = `By: ${authorParam}`;

    imgContainer.append(img);
    author.append(imgContainer, name);
    card.append(headline, author);

    return card;
}