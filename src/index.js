import { initNavigation } from "./logic/navigation.js";
import { renderPokemonCards } from "./logic/cards.js";
import { initPagination } from "./logic/pagination.js";

const init = () => {
    initNavigation();
    renderPokemonCards();
    initPagination();
};

init();
