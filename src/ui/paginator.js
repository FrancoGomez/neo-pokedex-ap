import { toggleDisable, toggleActive } from "../utilities/utilities.js";
import { deletePokemonCardsContainer, createPokemonCards } from "./cards.js";

export const createPageNavigationOptions = () => {
    const POKEMON_COUNT = 898;
    const POKEMON_PER_PAGE = 20;
    const PAGE_AMOUNT = Math.ceil(POKEMON_COUNT / POKEMON_PER_PAGE);

    const $pagination = document.querySelector("#pagination");

    $pagination.onclick = (e) => {
        handlePaginationClick(e.target);
    };

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

export const handlePaginationClick = (button) => {
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
    // The API starts from page zero, the pagination from page 1
    const pageIndex = numberIdActiveButton - 1;

    deletePokemonCardsContainer();
    createPokemonCards(pageIndex);
};
