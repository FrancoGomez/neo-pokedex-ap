import { toggleDisable, toggleActive } from "../utilities/utilities.js";
import { deletePokemonCardsContainer, createPokemonCards } from "./cards.js";

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
