const pokemonListEl = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');
const resetBtn = document.getElementById('resetBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let allPokemon = [];
let filteredPokemon = [];
let currentPage = 1;
const itemsPerPage = 12;

async function fetchAllPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
  const data = await response.json();
  allPokemon = data.results;
  filteredPokemon = [...allPokemon];
  displayPokemon();
}

async function displayPokemon() {
  pokemonListEl.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pokemonToDisplay = filteredPokemon.slice(start, end);

  for (let pokemon of pokemonToDisplay) {
    const res = await fetch(pokemon.url);
    const pokeData = await res.json();

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
      <h3>${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h3>
    `;
    card.addEventListener('click', () => showPopup(pokeData));
    pokemonListEl.appendChild(card);
  }
}

function searchPokemon() {
  const query = searchInput.value.toLowerCase();
  filteredPokemon = allPokemon.filter(p => p.name.includes(query));
  currentPage = 1;
  displayPokemon();
}

function resetList() {
  searchInput.value = '';
  filteredPokemon = [...allPokemon];
  currentPage = 1;
  displayPokemon();
}

function showPopup(pokemon) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');
  popupContent.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Base Experience: ${pokemon.base_experience}</p>
  `;
  popup.classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPokemon();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage * itemsPerPage < filteredPokemon.length) {
    currentPage++;
    displayPokemon();
  }
});

searchInput.addEventListener('input', searchPokemon);
resetBtn.addEventListener('click', resetList);

fetchAllPokemon();