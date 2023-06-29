import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';

import Home from './pages';
import NameGame from './pages/NameGame';
import PokemonSearch from './pages/PokemonSearch';

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

ReactDom.createRoot(document.querySelector('#root')).render(<App />);