const $inputSearchPokemon = document.querySelector(".search-pokemon__input");
const $buttonSearchPokemon = document.querySelector(".search-pokemon__button");
const $pokemonCardsContainerContainer = document.querySelector(
    ".pokemon-cards-container-container"
);
const $pagination = document.querySelector("#pagination");

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
const $pokemonModal = document.querySelector("#pokemon-modal");
const $cardPokemonModal = document.querySelector("#pokemon-modal__card");
const $alertPokemonNotFound = document.querySelector(
    "#alert-pokemon-not-found"
);
const $alertLoading = document.querySelector("#alert-loading");

const POKEMON_COUNT = 898;
const POKEMON_PER_PAGE = 20;

const init = () => {
    createPokemonCards(0);
    createPageNavitationOptions();
    $pagination.onclick = (e) => {
        handlePaginationClick(e.target);
    };
    $buttonSearchPokemon.onclick = (e) => {
        e.preventDefault();
        handleSearch();
    };
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
    $pokemonCardImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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

const handlePaginationClick = (button) => {
    if (
        button.classList.contains("disabled") ||
        button.classList.contains("active")
    )
        return;

    handlePaginationState(button);
    handlePaginationButtonRequest();
};

const handlePaginationState = (button) => {
    if (button.textContent === "Previous") {
        const activeButton = document.querySelector(".active");
        toggleActive(activeButton);
        toggleActive(activeButton.previousSibling);
    } else if (!isNaN(button.textContent)) {
        const activeButton = document.querySelector(".active");
        toggleActive(activeButton);

        if (button.className === "page-link") {
            toggleActive(button.parentElement);
        } else {
            toggleActive(button);
        }
    } else if (button.textContent === "Next") {
        const activeButton = document.querySelector(".active");

        toggleActive(activeButton);
        toggleActive(activeButton.nextSibling);
    }

    const $previousButton = document.querySelector("#button-Previous");
    const $nextButton = document.querySelector("#button-Next");
    const activeButton = document.querySelector(".active");

    if (activeButton.id === "button-1") {
        toggleDisable($previousButton);
    } else if ($previousButton.classList.contains("disabled")) {
        toggleDisable($previousButton);
    }

    if (activeButton.id === "button-45") {
        toggleDisable($nextButton);
    } else if ($nextButton.classList.contains("disabled")) {
        toggleDisable($nextButton);
    }
};

const handlePaginationButtonRequest = () => {
    const activeButton = document.querySelector(".active");
    const numberIdActiveButton = Number(activeButton.id.replace("button-", ""));

    deletePokemonCardsContainer();
    createPokemonCards(numberIdActiveButton - 1);
};

const handleSearch = async () => {
    const query = $inputSearchPokemon.value;

    if (query === "") return;

    const pokemonInfo = await getPokemonInfo(query.toLowerCase());

    if (pokemonInfo === undefined) return;

    showNewPokemonModal(pokemonInfo);
};

const handlePokemonCardClick = async (target) => {
    if (target.classList.contains("pokemon-card__image")) {
        const pokemonInfo = await getPokemonInfo(target.alt);
        showNewPokemonModal(pokemonInfo);
    }
};

const showNewPokemonModal = ({ name, id, weight, height, types }) => {
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

const getPokemonInfo = async (id) => {
    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (pokemonInfo.status === 200) {
        return pokemonInfo.json();
    } else {
        showErrorPokemonNotFound();
    }
};

const editPokemonModal = () => {};

const deletePokemonCardsContainer = () => {
    $pokemonCardsContainerContainer.children[0].remove();
};

const getPokemonImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const showErrorPokemonNotFound = () => {
    $namePokemonModal.textContent = "Error";
    toggleHidden($alertLoading);
    toggleHidden($alertPokemonNotFound);
};

$pokemonModal.addEventListener("hidden.bs.modal", () => {
    resetModalState();
});

const resetModalState = () => {
    $namePokemonModal.textContent = "Loading...";
    toggleHidden($alertLoading);

    if (!$cardPokemonModal.classList.contains("hidden")) {
        toggleHidden($cardPokemonModal);
    }

    if (!$alertPokemonNotFound.classList.contains("hidden")) {
        toggleHidden($alertPokemonNotFound);
    }
};

const toggleDisable = ($element) => {
    $element.classList.toggle("disabled");
};

const toggleActive = ($element) => {
    $element.classList.toggle("active");
};

const toggleHidden = ($element) => {
    $element.classList.toggle("hidden");
};

init();
