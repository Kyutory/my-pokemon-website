import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react'

import GuessingGame from './GuessingGame';
import SearchingPokemons from './SearchingPokemons';

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

const MainPage = () => {
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
              <Link to="guessing-game" onClick={onClickLink}>포켓몬 이름 맞추기 게임</Link>
            </div>
            <div>
              <Link to="searching-pokemons" onClick={onClickLink}>포켓몬 이름 검색</Link>
            </div>
          </div>
        }
        <Routes>
          <Route path="guessing-game" element={<GuessingGame />}></Route>
          <Route path="searching-pokemons" element={<SearchingPokemons />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainPage;