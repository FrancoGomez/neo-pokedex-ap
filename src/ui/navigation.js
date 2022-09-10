import { getPokemonInfo } from "../api.js";
import { showErrorPokemonNotFound, showNewPokemonModal } from "./modal.js";

const handleSearch = async () => {
    const $inputSearchPokemon = document.querySelector(
        ".search-pokemon__input"
    );

    const query = $inputSearchPokemon.value;

    if (query === "") return;

    showNewPokemonModal(query.toLowerCase());
};

export const initNavigationFunction = () => {
    const $searchButton = document.querySelector(".search-pokemon__button");

    $searchButton.onclick = (e) => {
        e.preventDefault();
        handleSearch();
    };
};
