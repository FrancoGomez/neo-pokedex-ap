export const searchPokemonOnStorage = (id) => {
  const result = localStorage.getItem(id);

  return result;
};

export const searchPageOnStorage = (pageNumber = 0, pokemonPerPage = 20) => {
  const result = localStorage.getItem(`offset=${
    pokemonPerPage * pageNumber
  }&limit=${pokemonPerPage}`);

  return JSON.parse(result);
};

export const savePokemonOnStorage = (id, entry) => {
  const POKEMON_COUNT = 898;

  if (!entry || entry > POKEMON_COUNT) {
    return null;
  }

  try {
    localStorage.setItem(JSON.stringify(id), JSON.stringify(entry));
  } catch (e) {
    throw new Error(`Error while saving on localStorage: ${e}`);
  }

  return null;
};

export const savePageOnStorage = (pageNumber = 0, pokemonPerPage = 20, entry = null) => {
  if (!entry) return null;

  try {
    localStorage.setItem(`offset=${
      pokemonPerPage * pageNumber
    }&limit=${pokemonPerPage}`, JSON.stringify(entry));
  } catch (e) {
    throw new Error(`Error while saving on localStorage: ${e}`);
  }

  return null;
};
