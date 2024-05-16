const app = document.querySelector(".background");
const filterSelector = document.querySelector(".filter");
const searchButton = document.getElementById("button"); // img lupki
const characterInput = document.querySelector(".country-bar");
const main = document.querySelector(".main");
const characterName = document.getElementById("character-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const switchButton = document.querySelector(".switch");
const headline = document.querySelector(".headline");
const backButton = document.querySelector(".back-button");
const characterClick = document.querySelector(".country-click");
const clickMain = document.querySelector(".click-main");
const imageInsideCharacterBox = document.querySelector(".flagInside");

async function fetchCharactersData() {
  const response = await fetch("https://rickandmortyapi.com/api/character/");
  const data = await response.json();

  return data.results;
}

fetchCharactersData();

async function fetchOneCountryData(characterName) {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  console.log(data);

  const character = data.results.find(
    (character) => character.name.toLowerCase() === characterName.toLowerCase()
  );
  if (character) {
    return character;
  } else {
    alert("Wrong character");
  }
}
async function startCharacters() {
  const characters = await fetchCharactersData();

  characters.forEach((character) => {
    createCharacters(character);
  });
}

startCharacters();

characterInput.addEventListener("input", async function (event) {
  const searchText = event.target.value.toLowerCase();
  console.log("searchText", searchText);
  const data = await fetchCharactersData();
  const filteredCharacters = data.filter((character) =>
    character.name.toLowerCase().startsWith(searchText)
  );
  console.log("filteredCharacters", filteredCharacters);
  main.innerHTML = "";
  filteredCharacters.forEach(createCharacters);
});

// const homeButton = document.querySelector(".house");
// homeButton.addEventListener("click", function () {
//   main.classList.remove("hidden");
//   countryClick.classList.add("hidden");
//   main.innerHTML = "";
//   let select = document.querySelector("select"); //filter reset
//   select.selectedIndex = 0;

//   startCountries();
// });

backButton.addEventListener("click", function () {
  app.classList.remove("hidden");
  characterClick.classList.add("hidden");
  main.classList.remove("hidden");
});

function createCharacters(character) {
  const characterBox = document.createElement("div");
  characterBox.classList.add("country-box");
  main.appendChild(characterBox);

  const image = document.createElement("img");
  image.classList.add("flag");
  image.src = character.image;
  characterBox.appendChild(image);

  const description = document.createElement("div");
  description.classList.add("description");
  characterBox.appendChild(description);

  const characterName = document.createElement("div");
  characterName.classList.add("country-name");
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
    const data = await fetchOneCountryData(character.name);
    clickOnTheCharacter(data);
  });
}

async function clickOnTheCharacter(character) {
  main.classList.add("hidden");
  characterClick.classList.remove("hidden");

  characterName.textContent = character.name;

  imageInsideCharacterBox.src = character.image;
  imageInsideCharacterBox.classList.add("flagInside");

  const currentNativeName = document.getElementById("singleNativeName");
  currentNativeName.textContent = country.nativeName;

  const currentPopulation = document.getElementById("singlePopulation");
  currentPopulation.textContent = country.population;

  const currentRegion = document.getElementById("singleRegion");
  currentRegion.textContent = country.region;

  const currentSubRegion = document.getElementById("singleSubRegion");
  currentSubRegion.textContent = country.subregion;

  const currentCapital = document.getElementById("singleCapital");
  currentCapital.textContent = country.capital;

  const topLevelDomain = document.getElementById("singleDomain");
  topLevelDomain.textContent = country.topLevelDomain;

  const firstCurrency = document.getElementById("singleCurrencies");
  const currencyArray = country.currencies;

  currencyArray.forEach((currency) => {
    const currencyName = currency.name;
    firstCurrency.textContent = currencyName;
  });

  const languages = document.getElementById("singleLanguages");
  const languagesArray = country.languages.map((language) => language.name);
  console.log(languagesArray);
  const languagesText = languagesArray.join(", ");

  languages.innerHTML = "";

  const languagesElement = document.createElement("span");
  languagesElement.textContent = languagesText;
  languages.appendChild(languagesElement);
}
