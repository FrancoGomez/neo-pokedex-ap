import { initNavigationFunction } from "./ui/navigation.js";
import { createPokemonCards } from "./ui/cards.js";
import { createPageNavigationOptions } from "./ui/paginator.js";

const init = () => {
    initNavigationFunction();
    createPokemonCards();
    createPageNavigationOptions();
};

init();
