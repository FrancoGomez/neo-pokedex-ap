import { getPokemonImage } from "../api.js";
import { toggleHidden } from "../utilities/utilities.js";

const $namePokemonModal = document.querySelector(
    "#pokemon-modal__pokemon-name"
);
const $cardPokemonModal = document.querySelector("#pokemon-modal__card");
const $alertPokemonNotFound = document.querySelector(
    "#alert-pokemon-not-found"
);
const $alertLoading = document.querySelector("#alert-loading");
const $pokemonModal = document.querySelector("#pokemon-modal");

$pokemonModal.addEventListener("hidden.bs.modal", () => {
    resetModalState();
});

export const showNewPokemonModal = ({ name, id, weight, height, types }) => {
    const $imagePokemonModal = document.querySelector(
        "#pokemon-modal__pokemon-image"
    );
    const $weightPokemonModal = document.querySelector(
        "#pokemon-modal__pokemon-weight"
    );
    const $heightPokemonModal = document.querySelector(
        "#pokemon-modal__pokemon-height"
    );
    const $typesPokemonModal = document.querySelector(
        "#pokemon-modal__pokemon-types"
    );

    $namePokemonModal.textContent = `${name} #${id
        .toString()
        .padStart(3, "0")}`;
    $imagePokemonModal.src = getPokemonImage(id);
    $weightPokemonModal.textContent = `Weight: ${weight / 10}kg`;
    $heightPokemonModal.textContent = `Height: ${height / 10}m`;
    $typesPokemonModal.textContent = "Type: ";

    if (types.length > 1) {
        $typesPokemonModal.textContent = "Types: ";
    }

    types.forEach((type, index) => {
        if (index !== 0) {
            $typesPokemonModal.textContent += ", ";
        }
        $typesPokemonModal.textContent += type.type.name;
    });

    toggleHidden($cardPokemonModal);
    toggleHidden($alertLoading);
};

export const showErrorPokemonNotFound = () => {
    $namePokemonModal.textContent = "Error";
    toggleHidden($alertLoading);
    toggleHidden($alertPokemonNotFound);
};

export const resetModalState = () => {
    $namePokemonModal.textContent = "Loading...";
    toggleHidden($alertLoading);

    if (!$cardPokemonModal.classList.contains("hidden")) {
        toggleHidden($cardPokemonModal);
    }

    if (!$alertPokemonNotFound.classList.contains("hidden")) {
        toggleHidden($alertPokemonNotFound);
    }
};
