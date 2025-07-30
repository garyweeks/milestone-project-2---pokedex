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