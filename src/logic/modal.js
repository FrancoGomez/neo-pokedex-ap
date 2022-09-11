import { getPokemonInfo } from "../api.js";
import { editPokemonModal } from "../ui/modal.js";
import { hideElement, showElement } from "../utilities/utilities.js";

const $pokemonModal = document.querySelector("#pokemon-modal");

export const showNewPokemonModal = async (pokemonId) => {
    const $cardPokemonModal = document.querySelector("#pokemon-modal__card");
    const $alertLoading = document.querySelector("#alert-loading");

    const pokemonInfo = await getPokemonInfo(pokemonId);

    if (pokemonInfo === undefined) return showErrorPokemonNotFound();

    editPokemonModal(pokemonInfo);
    showElement($cardPokemonModal);
    hideElement($alertLoading);
};

export const showErrorPokemonNotFound = () => {
    const $modalTitle = document.querySelector("#pokemon-modal__pokemon-name");
    const $alertLoading = document.querySelector("#alert-loading");
    const $alertNotFound = document.querySelector("#alert-pokemon-not-found");

    $modalTitle.textContent = "Error 404";
    hideElement($alertLoading);
    showElement($alertNotFound);
};

export const resetModalState = () => {
    const $modalTitle = document.querySelector("#pokemon-modal__pokemon-name");
    const $alertLoading = document.querySelector("#alert-loading");
    const $alertNotFound = document.querySelector("#alert-pokemon-not-found");
    const $cardPokemonModal = document.querySelector("#pokemon-modal__card");

    $modalTitle.textContent = "Loading...";
    showElement($alertLoading);
    hideElement($alertNotFound);
    hideElement($cardPokemonModal);
};

$pokemonModal.addEventListener("hidden.bs.modal", () => {
    resetModalState();
});
