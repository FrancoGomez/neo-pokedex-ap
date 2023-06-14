import BasicPokemon from '../entities/basicPokemon.js';
import PokemonList from '../entities/pokemonList.js';
import { getPokemonImage } from '../utilities/utilities.js';

export default (count, pokemons) => {
  const arrayBasicPokemon = [];

  pokemons.map(({ name, url }) => {
    const id = url.replace('v2', '').replace(/\D/g, '');

    arrayBasicPokemon.push(new BasicPokemon(getPokemonImage(id), name, id));

    return null;
  });

  return new PokemonList(count, arrayBasicPokemon);
};
