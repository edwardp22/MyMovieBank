/*
   Filename: card.js

   Purpose: Logic that get information from rest API
*/

const container = document.getElementById("cardContent");

async function apiCall(endPoint) {
  const result = await fetch(`https://imdb-api.com/en/API/${endPoint}`);
  const apiResult = await result.json();

  container.classList.remove("lds-ring");

  if (apiResult.errorMessage) {
    container.innerHTML = apiResult.errorMessage;
    return;
  }

  return apiResult;
}

async function showingNowCards() {
  const apiResult = await apiCall("InTheaters/k_3ia6todj");

  if (apiResult) {
    container.innerHTML = generateCards(apiResult.items);
  }
}

async function comingSoonCards() {
  const apiResult = await apiCall("ComingSoon/k_3ia6todj");

  if (apiResult) {
    container.innerHTML = generateCards(apiResult.items);
  }
}

async function top10Cards() {
  const apiResult = await apiCall("Top250Movies/k_3ia6todj");

  if (apiResult) {
    const items = apiResult.items.slice(0, 9);
    container.innerHTML = generateCards(items);
  }
}

async function mostPopularCards() {
  const apiResult = await apiCall("MostPopularMovies/k_3ia6todj");

  if (apiResult) {
    container.innerHTML = generateCards(apiResult.items);
  }
}

async function favoriteCards() {
  const items = [];

  for (let i = 0; i < favorites.length; i++) {
    const favorite = favorites[i];

    const apiResult = await apiCall(`Title/k_3ia6todj/${favorite}`);

    if (apiResult) {
      items.push(apiResult);
    }
  }

  container.innerHTML = generateCards(items, true);
}
