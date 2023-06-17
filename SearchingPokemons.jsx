import React, { useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import PokemonData from './PokemonData';

const matchedDataStyle = css({
  border: '1px solid black',
  width: '150px',
});

const makeCustomData = () => {
  const nameToId = {};
  const names = [];
  Object.entries(PokemonData).forEach(([id, name]) => {
    nameToId[name] = id;
    names.push(name);
  });
  return [nameToId, names];
}

const SearchingPokemons = () => {
  const [nameToId, names] = useMemo(makeCustomData, []);

  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [matchedDataList, setMatchedDataList] = useState([]);

  const onClickButton = (e) => {
    e.preventDefault();
    const searchedId = nameToId[inputValue];
    if (searchedId) {
      setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedId}.png`);
      // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${chosenId}.svg`
    } else {
      setImgURL('./image/no-result.jpg');
    }
  }

  const onChangeInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setMatchedDataList(names.filter(name => {
      let flag = value[0] === name[0];
      for (let i = 1; i < value.length; i++) {
        flag = flag && (value[i] === name[i]);
      }
      return flag;
    }));

    console.log(matchedDataList);
  }

  return (
    <>
      <form>
        <input type="text" value={inputValue} onChange={onChangeInput} />
        <button onClick={onClickButton}>검색</button>
      </form>
      {matchedDataList.map((v) => <div css={matchedDataStyle}>{v}</div>)}
      <div>
        <img src={imgURL} />
      </div>
    </>
  );
}

export default SearchingPokemons;