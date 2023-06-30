import React from 'react';
import ReactDom from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';

import Home from './pages';
import NameGame from './pages/NameGame';
import PokemonSearch from './pages/PokemonSearch';

import P from './pokeAPI-config';

const App = () => {
  return (
    <HashRouter>
      <Global styles={{
        'a': {
          textDecoration: 'none',
          color: 'black',
        }
      }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="name-game" element={<NameGame />} />
        <Route path="pokemon-search" element={<PokemonSearch />} />
      </Routes>
    </HashRouter>
  );
}

ReactDom.createRoot(document.querySelector('#root')).render(<App />);