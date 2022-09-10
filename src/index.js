import { initNavigationFunction } from "./ui/navigation.js";
import { showPokemonCards } from "./ui/cards.js";
import { createPageNavigationOptions } from "./ui/paginator.js";

const init = () => {
    initNavigationFunction();
    showPokemonCards();
    createPageNavigationOptions();
};

init();
