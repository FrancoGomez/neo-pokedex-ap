export const getPokemonList = async (pageNumber = 0, pokemonPerPage = 20) => {
  const pokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      pokemonPerPage * pageNumber
    }&limit=${pokemonPerPage}`,
  );

  if (pokemonList.status === 200) {
    return pokemonList.json();
  }

  return null;
};

export const getPokemonInfo = async (id) => {
  const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (pokemonInfo.status === 200) {
    return pokemonInfo.json();
  }

  return null;
};
