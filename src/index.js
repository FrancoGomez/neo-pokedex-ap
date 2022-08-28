const $pokemonCardsContainerContainer = document.querySelector(
    ".pokemon-cards-container-container"
);
const $pagination = document.querySelector("#pagination");

const POKEMON_COUNT = 898;
const POKEMON_PER_PAGE = 20;

const init = () => {
    createPokemonCards(0);
    createPageNavitationOptions();
};

const getPokemonList = async (pageNumber) => {
    const pokemonList = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${
            20 * pageNumber
        }&limit=${POKEMON_PER_PAGE}`
    );

    return pokemonList.json();
};

const createPokemonCards = async (pageNumber) => {
    const { results } = await getPokemonList(pageNumber);
    const $pokemonCardsContainer = returnPokemonCards(results);

    $pokemonCardsContainerContainer.appendChild($pokemonCardsContainer);
};

const returnPokemonCards = (arrayPokemon) => {
    const $pokemonCardsContainer = document.createElement("div");
    $pokemonCardsContainer.className = "pokemon-cards-container";

    for (const object of arrayPokemon) {
        // \D matches a character that is not a numerical digit.
        const { name, url } = object;
        const id = url.replace("v2", "").replace(/\D/g, "");

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
    $pokemonCardImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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

const createPageNavitationOptions = () => {
    const PAGE_AMOUNT = Math.ceil(POKEMON_COUNT / POKEMON_PER_PAGE);

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
    $pageOption.className = "page-item";

    if (textContent === "Previous") {
        $pageOption.classList.add("disabled");
    }

    const $pageLinkOption = document.createElement("a");
    $pageLinkOption.className = "page-link option";
    $pageLinkOption.setAttribute("href", "#")
    $pageLinkOption.textContent = textContent;

    if (typeof textContent === "number") {
        $pageLinkOption.classList.add("option");
    }

    $pageOption.appendChild($pageLinkOption);

    return $pageOption;
};

init();
