import { getPokemonImage } from "../utilities/utilities.js";
import { showNewPokemonModal } from "./modal.js";
import { getPokemonList } from "../api.js";

export const returnPokemonCards = (arrayPokemon) => {
    const POKEMON_COUNT = 898;

    const $fragment = document.createDocumentFragment();

    for (const object of arrayPokemon) {
        // \D matches a character that is not a numerical digit.
        const { name, url } = object;
        const id = url.replace("v2", "").replace(/\D/g, "");

        if (id > POKEMON_COUNT) break;

        const $pokemonCard = returnPokemonCard(name, id);
        $fragment.appendChild($pokemonCard);
    }

    return $fragment;
};

const returnPokemonCard = (name, id) => {
    const $pokemonCard = document.createElement("article");
    $pokemonCard.className = "card pokemon-card";
    $pokemonCard.setAttribute("id", id);

    const $pokemonCardImage = document.createElement("img");
    $pokemonCardImage.className = "card-img-top pokemon-card__image";
    $pokemonCardImage.src = getPokemonImage(id);
    $pokemonCardImage.setAttribute("data-bs-toggle", "modal");
    $pokemonCardImage.setAttribute("data-bs-target", "#pokemon-modal");

    $pokemonCardImage.setAttribute("alt", name);

    const $pokemonCardBody = document.createElement("div");
    $pokemonCardBody.className =
        "card-body bg-primary text-white rounded-bottom pokemon-card__body";

    const $pokemonName = document.createElement("h2");
    $pokemonName.textContent = name;

    const $pokemonId = document.createElement("p");
    $pokemonId.textContent = `#${id.padStart(3, "0")}`;

    $pokemonCardBody.appendChild($pokemonName);
    $pokemonCardBody.appendChild($pokemonId);

    $pokemonCard.appendChild($pokemonCardImage);
    $pokemonCard.appendChild($pokemonCardBody);

    return $pokemonCard;
};

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
