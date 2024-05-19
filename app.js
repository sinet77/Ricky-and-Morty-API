const app = document.querySelector(".background");
const characterInput = document.querySelector(".character-bar");
const main = document.querySelector(".main");
const characterName = document.getElementById("character-name");
const backButton = document.querySelector(".back-button");
const characterClick = document.querySelector(".character-click");
const imageInsideCharacterBox = document.querySelector(
  ".imageInsideCharacterBox"
);
const nextPageButton = document.querySelector(".next-page");

let nextPageUrl = "https://rickandmortyapi.com/api/character";

async function fetchCharactersData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function fetchEpisodesData() {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();

  return data.results;
}

async function fetchOneCharacterData(characterName) {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  const character = data.results.find(
    (character) => character.name.toLowerCase() === characterName.toLowerCase()
  );
  if (character) {
    return character;
  } else {
    alert("Wrong character");
  }
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

backButton.addEventListener("click", function () {
  app.classList.remove("hidden");
  characterClick.classList.add("hidden");
  main.classList.remove("hidden");
});

function createCharacters(character) {
  const characterBox = document.createElement("div");
  characterBox.classList.add("character-box");
  main.appendChild(characterBox);

  const image = document.createElement("img");
  image.classList.add("image");
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

  characterBox.addEventListener("click", async function () {
    const data = await fetchOneCharacterData(character.name);
    const episodesData = await fetchEpisodesData();
    clickOnTheCharacter(data, episodesData);
  });
}

async function clickOnTheCharacter(character, episodes) {
  main.classList.add("hidden");
  characterClick.classList.remove("hidden");

  characterName.textContent = character.name;

  imageInsideCharacterBox.src = character.image;
  imageInsideCharacterBox.classList.add("imageInsideCharacterBox");

  const gender = document.getElementById("gender");
  gender.textContent = character.gender;

  const location = document.getElementById("locationName");
  location.textContent = character.location.name;

  const status = document.getElementById("status");
  status.textContent = character.status;

  const episodeList = document.getElementById("episodeList");
  episodeList.innerHTML = "";

  const characterEpisodes = episodes.filter((episode) =>
    episode.characters.includes(
      `https://rickandmortyapi.com/api/character/${character.id}`
    )
  );

  characterEpisodes.forEach((episode) => {
    const episodeItem = document.createElement("li");
    episodeItem.textContent = `${episode.episode}: ${episode.name}`;
    episodeList.appendChild(episodeItem);
  });
}
nextPageButton.addEventListener("click", function () {
  loadCharacters(nextPageUrl);
});
