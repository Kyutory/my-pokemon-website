import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

import type { Pokemon } from '../types/pokemon';

type PokemonStore = {
  pokemons: Pokemon[];
  allPokemonCount: number;
};

const dummyPokemons = Array(25)
  .fill()
  .map((v, i) => {
    const types = Array((i % 3) + 1)
      .fill()
      .map(() => faker.animal.cat());
    return {
      id: i,
      name: faker.animal.bear(),
      weight: 5,
      height: 10,
      speed: 15,
      base_stat: 20,
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
      weight: 5,
      height: 10,
      speed: 15,
      base_stat: 20,
      types: ['전기'],
      imgUrl: '../../public/pikachu.png',
    },
    {
      id: 300,
      name: '파이리',
      weight: 5,
      height: 10,
      speed: 15,
      base_stat: 20,
      types: ['불', '화염'],
      imgUrl: '',
    },
    {
      id: 400,
      name: '뮤',
      weight: 5,
      height: 10,
      speed: 15,
      base_stat: 20,
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
