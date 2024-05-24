const app = document.querySelector(".background");
const characterInput = document.querySelector(".character-bar");
const main = document.querySelector(".main");
const characterName = document.getElementById("character-name");
const characterClick = document.querySelector(".character-click");
const imageInsideCharacterBox = document.querySelector(
  ".imageInsideCharacterBox"
);
const nextPageButton = document.querySelector(".next-page");

let nextPageUrl = "https://rickandmortyapi.com/api/character";

let currentPage = 1;
let searchString = "";

const setCurrentPage = (page) => {
  currentPage = page;
  loadCharacters();
};
async function fetchCharactersData() {
  // !obsługa błędów
  const url = "https://rickandmortyapi.com/api/character?page=" + currentPage;

  if (searchString) {
    url += "&name=" + searchString;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function fetchOneCharacterData(characterId) {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/" + characterId
  );
  return await response.json();
}

async function loadCharacters(url) {
  const data = await fetchCharactersData(url);
  nextPageUrl = data.info.next;

  const characters = data.results;
  main.innerHTML = "";

  characters.forEach((character) => {
    createCharacters(character);
  });
}

loadCharacters(nextPageUrl);
// characterInput.addEventListener("keypress", async function (event) {
//     if (event.key === "Enter") {}

characterInput.addEventListener("input", async function (event) {
  const searchText = event.target.value.toLowerCase();
  console.log("searchText", searchText);
  const data = await fetchCharactersData(nextPageUrl);
  const filteredCharacters = data.results.filter((character) =>
    character.name.toLowerCase().startsWith(searchText)
  );
  console.log("filteredCharacters", filteredCharacters);
  main.innerHTML = "";
  filteredCharacters.forEach(createCharacters);
});

function createCharacters(character) {
  const characterBox = document.createElement("a");
  characterBox.href = "/details?id=" + character.id;
  characterBox.classList.add("character-box");
  main.appendChild(characterBox);

  const image = document.createElement("img");
  image.classList.add("image");
  image.alt = "Image of a character";
  image.src = character.image;
  characterBox.appendChild(image);

  const description = document.createElement("div");
  description.classList.add("description");
  characterBox.appendChild(description);

  const characterName = document.createElement("div");
  characterName.classList.add("character-name");
  characterName.textContent = character.name;
  description.appendChild(characterName);

  const together = document.createElement("div");
  together.classList.add("together");
  description.appendChild(together);

  const species = document.createElement("div");
  species.classList.add("population");
  species.textContent = character.species;
  together.appendChild(species);
}

nextPageButton.addEventListener("click", function () {
  setCurrentPage(currentPage + 1);
});
