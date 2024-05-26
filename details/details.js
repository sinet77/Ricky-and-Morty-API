const search = new URLSearchParams(window.location.search);
const backButton = document.querySelector(".back-button");
const characterClick = document.querySelector(".character-click");
const app = document.querySelector(".background");
const characterName = document.getElementById("character-name");

const firstColumn = document.querySelector(".first-column");

async function fetchCharactersData() {
  // !obsługa błędów
  const url = "https://rickandmortyapi.com/api/character/" + search.get("id");
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch character details:", error);
    return null;
  }
}

async function fetchEpisodesData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/episode");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch episodes data:", error);
    return [];
  }
}

async function clickOnTheCharacter(character, episodes) {
  characterName.textContent = character.name;

  const imageInsideCharacterBox = document.createElement("img");
  imageInsideCharacterBox.src = character.image;
  imageInsideCharacterBox.classList.add("imageInsideCharacterBox");
  firstColumn.appendChild(imageInsideCharacterBox);

  const gender = document.getElementById("gender");
  gender.textContent = character.gender;

  const location = document.getElementById("locationName");
  location.textContent = character.location.name;

  const status = document.getElementById("status");
  status.textContent = character.status;

  const episodeList = document.getElementById("episodeList");
  episodeList.innerHTML = "";

  const characterEpisodes = episodes.results.filter((episode) =>
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

// characterBox.addEventListener("click", async function () {
//   const data = await fetchOneCharacterData(character.id);
//   const episodesData = await fetchEpisodesData();
//   clickOnTheCharacter(data, episodesData);
// });

backButton.addEventListener("click", function () {
  window.location.href = "/index.html";
});

(async () => {
  const characterData = await fetchCharactersData();
  if (characterData) {
    const episodesData = await fetchEpisodesData();
    console.log(episodesData);
    clickOnTheCharacter(characterData, episodesData);
  }
})();
