import { showNewPokemonModal } from "./modal.js";

export const initNavigation = () => {
    const $searchButton = document.querySelector(".search-pokemon__button");

    $searchButton.onclick = (e) => {
        e.preventDefault();
        handleSearch();
    };
};

const handleSearch = async () => {
    const $inputSearchPokemon = document.querySelector(
        ".search-pokemon__input"
    );

    const query = $inputSearchPokemon.value;

    if (query === "") return;

    showNewPokemonModal(query.toLowerCase());
};