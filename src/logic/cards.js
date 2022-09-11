import { returnPokemonCards } from "../ui/cards.js";
import { showNewPokemonModal } from "./modal.js";
import { getPokemonList } from "../api.js";

const $pokemonCardsContainer = document.querySelector(
    ".pokemon-cards-container"
);

export const renderPokemonCards = async (pageNumber = 0) => {
    const { results } = await getPokemonList(pageNumber);
    const $pokemonCards = returnPokemonCards(results);

    $pokemonCardsContainer.appendChild($pokemonCards);
};

export const deletePokemonCards = () => {
    const cardAmount = $pokemonCardsContainer.childElementCount;

    for (let i = cardAmount - 1; i >= 0; i--) {
        $pokemonCardsContainer.children[i].remove();
    }
};

$pokemonCardsContainer.onclick = (e) => {
    handlePokemonCardClick(e.target);
};

const handlePokemonCardClick = async (target) => {
    if (target.classList.contains("pokemon-card__image")) {
        showNewPokemonModal(target.alt);
    }
};
