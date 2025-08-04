// Number of Pokémon to show per page
const limit = 20;
let offset = 0;

// Run once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPokemonList(); // Load first page

  // Event: Next page button
  document.getElementById('nextBtn').addEventListener('click', () => {
    offset += limit;
    loadPokemonList();
  });

  // Event: Previous page button
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (offset >= limit) {
      offset -= limit;
      loadPokemonList();
    }
  });

  // Event: Search when Enter key is pressed
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const value = e.target.value.toLowerCase().trim();
      if (value) {
        searchPokemon(value);
      }
    }
  });
});

// Load a list of Pokémon from the API using pagination
async function loadPokemonList() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();

  const listContainer = document.getElementById('pokemonList');
  listContainer.innerHTML = ''; // Clear previous results

  // Loop through each Pokémon returned in the list
  for (let item of data.results) {
    const pokeData = await fetch(item.url).then(res => res.json());

    // Create a new card element
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${pokeData.name.toUpperCase()}</h3>
      <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
      <p>#${pokeData.id}</p>
    `;

    // On click, show more detailed popup
    card.onclick = () => showDetails(pokeData);

    // Add card to page
    listContainer.appendChild(card);
  }
}

// Show full details of a Pokémon in a popup
function showDetails(data) {
  const popup = document.getElementById('popup');
  const content = document.getElementById('popupContent');

  // Fill popup with Pokémon details
  content.innerHTML = `
    <h2>${data.name.toUpperCase()} (#${data.id})</h2>
    <img src="${data.sprites.front_default}" />
    <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
    <p><strong>Height:</strong> ${data.height / 10} m</p>
    <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
    <p><strong>Base Stats:</strong></p>
    <ul>
      ${data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('')}
    </ul>
  `;

  // Show popup
  popup.classList.remove('hidden');
}

// Hide popup
function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}
