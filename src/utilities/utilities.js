export const disableElement = ($element) => {
    $element.classList.add("disabled");
};

export const undisableElement = ($element) => {
    $element.classList.remove("disabled");
};

export const activeElement = ($element) => {
    $element.classList.add("active");
};

export const desactiveElement = ($element) => {
    $element.classList.remove("active");
};

export const hideElement = ($element) => {
    $element.classList.add("hidden");
};

export const showElement = ($element) => {
    $element.classList.remove("hidden");
};

export const getPokemonImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
