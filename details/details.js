const search = new URLSearchParams(window.location.search);
const backButton = document.querySelector(".back-button");
const characterClick = document.querySelector(".character-click");
const main = document.querySelector(".main");
const app = document.querySelector(".background");

async function fetchCharactersData() {
  // !obsługa błędów
  const url = "https://rickandmortyapi.com/api/character/" + search.get("id");

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

fetchCharactersData();

backButton.addEventListener("click", function () {
  app.classList.remove("hidden");
  characterClick.classList.add("hidden");
  main.classList.remove("hidden");
});
