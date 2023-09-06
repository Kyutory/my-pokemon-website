import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

import type { PokemonData } from '../types/PokemonData';

type PokemonStore = {
  pokemons: PokemonData[];
  allPokemonCount: number;
};

const dummyPokemons = Array(25)
  .fill(0)
  .map((v, i) => {
    const types = Array((i % 3) + 1)
      .fill(0)
      .map(() => faker.animal.cat());
    return {
      id: i,
      name: faker.animal.bear(),
      types: types,
      // imgUrl: faker.image.avatar(),
      imgUrl: '../../public/pikachu.png',
    };
  });

const initialState: PokemonStore = {
  pokemons: [
    {
      id: 100,
      name: '피카츄',
      types: ['전기'],
      imgUrl: '../../public/pikachu.png',
    },
    {
      id: 300,
      name: '파이리',
      types: ['불', '화염'],
      imgUrl: '',
    },
    {
      id: 400,
      name: '뮤',
      types: ['신비'],
      imgUrl: '',
    },
    ...dummyPokemons,
  ],
  allPokemonCount: 1010,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice.reducer;
