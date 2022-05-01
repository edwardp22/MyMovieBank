/*
   Filename: card.js

   Purpose: Logic that create cards with movies information from rest API
*/

const storage = localStorage.getItem("favorites");
const favorites = JSON.parse(storage || "[]");
// localStorage.clear();

function toogleFavorite(id, removeCard) {
  const index = favorites.findIndex((favorite) => favorite === id);
  const card = document.getElementById("card" + id);
  const star = document.getElementById("star" + id);

  if (index !== -1) {
    favorites.splice(index, 1);

    card.classList.remove("favorite");
    star.classList.remove("fa-solid");
    star.classList.add("fa-regular");

    if (removeCard) card.parentNode.removeChild(card);
  } else {
    favorites.push(id);

    card.classList.add("favorite");
    star.classList.remove("fa-regular");
    star.classList.add("fa-solid");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function generateCards(items, removeCard) {
  let content = "";

  items.forEach((movie) => {
    const { id, image, fullTitle, contentRating, plot } = movie;
    const isFavorite = favorites.some((favorite) => favorite === id);

    content += `
        <div class="col-12 col-md-4">
            <div 
                class="card ${isFavorite ? "favorite" : ""}" 
                id="card${id}" 
                
            >
                <i 
                    class="fa-${isFavorite ? "solid" : "regular"} 
                    fa-star" 
                    onclick="toogleFavorite('${id}', ${removeCard})" 
                    id="star${id}"
                ></i>

                <img 
                    src="${image}" 
                    class="card-img-top" 
                    alt="" loading="lazy"
                    data-bs-toggle="modal" 
                    data-bs-target="#detailsModal"
                    onclick="showMovie('${id}')"
                />

                <div 
                    class="card-body" 
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                    onclick="showMovie('${id}')"
                >
                    <h5 class="card-title">
                        ${fullTitle} 
                        <br /> 
                        ${
                          contentRating
                            ? `<span class="badge rounded-pill bg-info">${contentRating}</span>`
                            : ""
                        }
                    </h5>

                    <p class="card-text">${plot || ""}</p>
                </div>                  
            </div>
        </div>
    `;
  });

  return content;
}
