import { returnPageNavigationOptions } from "../ui/paginator.js";
import {
    activeElement,
    desactiveElement,
    disableElement,
    undisableElement,
} from "../utilities/utilities.js";
import { deletePokemonCards, renderPokemonCards } from "./cards.js";

export const initPagination = () => {
    const $pagination = document.querySelector("#pagination");

    const $paginationOptions = returnPageNavigationOptions();

    $pagination.appendChild($paginationOptions);

    $pagination.onclick = ({ target }) => {
        handlePaginationClick(target);
    };
};

const handlePaginationState = (button) => {
    if (button.textContent === "Previous") {
        const activeButton = document.querySelector(".active");
        desactiveElement(activeButton);
        activeElement(activeButton.previousSibling);
    } else if (!isNaN(button.textContent)) {
        const activeButton = document.querySelector(".active");
        desactiveElement(activeButton);

        if (button.className === "page-link") {
            activeElement(button.parentElement);
        } else {
            activeElement(button);
        }
    } else if (button.textContent === "Next") {
        console;
        const activeButton = document.querySelector(".active");

        desactiveElement(activeButton);
        activeElement(activeButton.nextSibling);
    }

    const $previousButton = document.querySelector("#button-Previous");
    const $nextButton = document.querySelector("#button-Next");
    const activeButton = document.querySelector(".active");

    if (activeButton.id === "button-1") {
        disableElement($previousButton);
    } else if ($previousButton.classList.contains("disabled")) {
        undisableElement($previousButton);
    }

    if (activeButton.id === "button-45") {
        disableElement($nextButton);
    } else if ($nextButton.classList.contains("disabled")) {
        undisableElement($nextButton);
    }
};

const handlePaginationButtonRequest = () => {
    const activeButton = document.querySelector(".active");

    const numberIdActiveButton = Number(activeButton.id.replace("button-", ""));
    // The API starts from page zero, the pagination from page 1
    const pageIndex = numberIdActiveButton - 1;

    deletePokemonCards();
    renderPokemonCards(pageIndex);
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
