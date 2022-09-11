import { getPokemonImage } from "../utilities/utilities.js";

export const editPokemonModal = ({ name, id, weight, height, types }) => {
    const $namePokemonModal = document.querySelector(
        "#pokemon-modal__pokemon-name"
    );
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
};
