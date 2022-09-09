import { getPokemonInfo } from "../api.js";
import { showErrorPokemonNotFound, showNewPokemonModal } from "./modal.js";

export const createPageNavigationOptions = () => {
    const POKEMON_COUNT = 898;
    const POKEMON_PER_PAGE = 20;
    const PAGE_AMOUNT = Math.ceil(POKEMON_COUNT / POKEMON_PER_PAGE);
    
    const $pagination = document.querySelector("#pagination");

    const $fragment = document.createDocumentFragment();

    const $pagePreviousOption = createNavigationOption("Previous");
    $fragment.appendChild($pagePreviousOption);

    for (let i = 1; i <= PAGE_AMOUNT; i++) {
        const $pageOption = createNavigationOption(i);
        $fragment.appendChild($pageOption);
    }

    const $pageNextOption = createNavigationOption("Next");
    $fragment.appendChild($pageNextOption);

    $pagination.appendChild($fragment);
};

const createNavigationOption = (textContent) => {
    const $pageOption = document.createElement("li");
    $pageOption.className = "page-item page-navigation-option";
    $pageOption.setAttribute("id", `button-${textContent}`);

    if (textContent === "Previous") {
        $pageOption.classList.add("disabled");
    }

    if (typeof textContent === "number") {
        $pageOption.classList.add("option");

        if (textContent === 1) {
            $pageOption.classList.add("active");
        }
    }

    const $pageLinkOption = document.createElement("a");
    $pageLinkOption.className = "page-link";

    $pageLinkOption.textContent = textContent;

    $pageOption.appendChild($pageLinkOption);

    return $pageOption;
};

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
