import { getPokemonList, getPokemonInfo, getPokemonImage } from "../api.js";
import { showNewPokemonModal, showErrorPokemonNotFound } from "./modal.js";

export const createPokemonCards = async (pageNumber = 0) => {
    const $pokemonCardsContainerContainer = document.querySelector(
        ".pokemon-cards-container-container"
    );

    const { results } = await getPokemonList(pageNumber);
    const $pokemonCardsContainer = returnPokemonCards(results);

    $pokemonCardsContainerContainer.appendChild($pokemonCardsContainer);
};

const returnPokemonCards = (arrayPokemon) => {
    const POKEMON_COUNT = 898;

    const $pokemonCardsContainer = document.createElement("div");
    $pokemonCardsContainer.className = "pokemon-cards-container";

    $pokemonCardsContainer.onclick = (e) => {
        handlePokemonCardClick(e.target);
    };

    for (const object of arrayPokemon) {
        // \D matches a character that is not a numerical digit.
        const { name, url } = object;
        const id = url.replace("v2", "").replace(/\D/g, "");

        if (id > POKEMON_COUNT) break;

        const $pokemonCard = returnPokemonCard(name, id);
        $pokemonCardsContainer.appendChild($pokemonCard);
    }

    return $pokemonCardsContainer;
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

const handlePokemonCardClick = async (target) => {
    if (target.classList.contains("pokemon-card__image")) {
        const pokemonInfo = await getPokemonInfo(target.alt);

        if (pokemonInfo === undefined) return showErrorPokemonNotFound();

        showNewPokemonModal(pokemonInfo);
    }
};

export const deletePokemonCardsContainer = () => {
    const $pokemonCardsContainerContainer = document.querySelector(
        ".pokemon-cards-container-container"
    );

    $pokemonCardsContainerContainer.children[0].remove();
};
