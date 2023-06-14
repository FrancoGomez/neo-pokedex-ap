/// <reference types="Jest"/>

import { getPokemonImage } from "../utilities";

test("with id 1 it should return bulbasaur sprite url", () => {
    expect(getPokemonImage(1)).toBe(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
    );
});
