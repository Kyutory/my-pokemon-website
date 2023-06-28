import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react'

import NameGame from './NameGame';
import PokemonSearch from './PokemonSearch';

const headerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '35px',
  backgroundColor: 'orange',
});

const LinksStyle = css({
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '20px',
});

const Home = () => {
  const [isMain, setIsMain] = useState(true);

  const onClickMain = () => {
    setIsMain(true);
  }

  const onClickLink = () => {
    setIsMain(false);
  }

  return (
    <>
      <BrowserRouter>
        <Link to="/" onClick={onClickMain}><header css={headerStyle}>포켓몬</header></Link>
        {isMain &&
          <div css={LinksStyle}>
            <div>
              <Link to="name-game" onClick={onClickLink}>포켓몬 이름 맞추기 게임</Link>
            </div>
            <div>
              <Link to="pokemon-search" onClick={onClickLink}>포켓몬 이름 검색</Link>
            </div>
          </div>
        }
        <Routes>
          <Route path="name-game" element={<NameGame />}></Route>
          <Route path="pokemon-search" element={<PokemonSearch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;