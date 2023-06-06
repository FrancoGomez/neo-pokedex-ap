import { initNavigation } from './ui/navigation.js';
import { renderPokemonCards } from './ui/cards.js';
import { initPagination } from './ui/paginator.js';

const init = () => {
  initNavigation();
  renderPokemonCards();
  initPagination();
};

init();
