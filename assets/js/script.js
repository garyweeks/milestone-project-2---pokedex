const pokemonList = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');
let currentPage = 1;
const limit = 20;

// Load Pokémon list
async function loadPokemonList() {
  const offset = (currentPage - 1) * limit;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  
  pokemonList.innerHTML = '';
  data.results.forEach(pokemon => {
    fetchPokemonCard(pokemon.url);
  });
}

// Fetch and create Pokémon card
async function fetchPokemonCard(url) {
  const res = await fetch(url);
  const pokemon = await res.json();
  
  const card = document.createElement('div');
  card.classList.add('pokemon-card');
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
  `;
  
  card.addEventListener('click', () => showPopup(pokemon));
  pokemonList.appendChild(card);
}

// Show popup with Pokémon details
function showPopup(pokemon) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');
  
  popupContent.innerHTML = `
    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
  `;
  
  popup.classList.remove('hidden');
}

// Close popup
function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}

// Pagination
document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadPokemonList();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentPage++;
  loadPokemonList();
});

// Search
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.toLowerCase();
  if (!query) {
    loadPokemonList();
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!res.ok) throw new Error("Not found");
    const pokemon = await res.json();
    pokemonList.innerHTML = '';
    fetchPokemonCard(`https://pokeapi.co/api/v2/pokemon/${query}`);
  } catch {
    pokemonList.innerHTML = '<p>No Pokémon found.</p>';
  }
});

// Initial load
loadPokemonList();