export const getPokemonList = async (pageNumber = 0) => {
    const POKEMON_PER_PAGE = 20;

    const pokemonList = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${
            POKEMON_PER_PAGE * pageNumber
        }&limit=${POKEMON_PER_PAGE}`
    );

    if (pokemonList.status === 200) {
        return pokemonList.json();
    }

    return;
};

export const getPokemonInfo = async (id) => {
    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (pokemonInfo.status === 200) {
        return pokemonInfo.json();
    }

    return;
};

export const getPokemonImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
