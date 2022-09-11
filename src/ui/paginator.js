export const returnPageNavigationOptions = () => {
    const POKEMON_COUNT = 898;
    const POKEMON_PER_PAGE = 20;
    const PAGE_AMOUNT = Math.ceil(POKEMON_COUNT / POKEMON_PER_PAGE);

    const $fragment = document.createDocumentFragment();

    const $pagePreviousOption = returnNavigationOption("Previous");
    $fragment.appendChild($pagePreviousOption);

    for (let i = 1; i <= PAGE_AMOUNT; i++) {
        const $pageOption = returnNavigationOption(i);
        $fragment.appendChild($pageOption);
    }

    const $pageNextOption = returnNavigationOption("Next");
    $fragment.appendChild($pageNextOption);

    return $fragment;
};

const returnNavigationOption = (textContent) => {
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
