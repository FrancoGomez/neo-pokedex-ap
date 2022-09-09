import { getPokemonInfo } from "../api.js";
import { showErrorPokemonNotFound, showNewPokemonModal } from "./modal.js";

export const handleSearch = async () => {
    const $inputSearchPokemon = document.querySelector(
        ".search-pokemon__input"
    );

    const query = $inputSearchPokemon.value;

    if (query === "") return;

    const pokemonInfo = await getPokemonInfo(query.toLowerCase());

    if (pokemonInfo === undefined) return showErrorPokemonNotFound();

    showNewPokemonModal(pokemonInfo);
};
