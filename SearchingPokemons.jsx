import React, { useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import PokemonData from './PokemonData';

const INITIAL_HANGUL = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
  'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];
const FIRST_FULL_HANGUL_CODE = '가'.charCodeAt();
const LAST_FULL_HANGUL_CODE = '힣'.charCodeAt();
const FIRST_INITIAL_HANGUL_CODE = 'ㄱ'.charCodeAt();
const LAST_INITIAL_HANGUL_CODE = 'ㅎ'.charCodeAt();

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

const getInitialByFullHangul = (fullHangul) => {
  if (fullHangul) {
    return INITIAL_HANGUL[Math.floor((fullHangul.charCodeAt() - '가'.charCodeAt()) / 588)];
  }
}

const SearchingPokemons = () => {
  const [nameToId, names] = useMemo(makeCustomData, []);

  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [matchedDataList, setMatchedDataList] = useState([]);

  const onClickButton = (e) => {
    e.preventDefault();
    setMatchedDataList([]);
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
    const valueCode = value.charCodeAt();
    setMatchedDataList(names.filter(name => {
      if (FIRST_FULL_HANGUL_CODE <= valueCode && valueCode <= LAST_FULL_HANGUL_CODE) {
        return isMatchedDataByFullHangul(name, value);
      } else if (FIRST_INITIAL_HANGUL_CODE <= valueCode && valueCode <= LAST_INITIAL_HANGUL_CODE) {
        return isMatchedDataByInitialHangul(name, value);
      } else {
        return false;
      }
    }));
  }

  const isMatchedDataByFullHangul = (name, value) => {
    let flag = value[0] === name[0];
    for (let i = 1; i < value.length; i++) {
      flag = flag && (value[i] === name[i]);
    }
    return flag;
  }

  const isMatchedDataByInitialHangul = (name, value) => {
    let flag = value[0] === getInitialByFullHangul(name[0]);
    for (let i = 1; i < value.length; i++) {
      flag = flag && (value[i] === getInitialByFullHangul(name[i]));
    }
    return flag;
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