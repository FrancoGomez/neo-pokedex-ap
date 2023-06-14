import Pokemon from '../entities/pokemon.js';
import { getPokemonImage } from '../utilities/utilities.js';

export default ({
  name, id, weight, height, types,
}) => new Pokemon(
  getPokemonImage(id),
  name,
  id,
  weight,
  height,
  types.map((item) => item.type.name),
);
