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

const matchedDataListStyle = css({
  border: '1px solid black',
  width: '150px',
});

const foucsedDataStyle = css({
  backgroundColor: 'wheat',
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

const getInitialFromFullHangul = (fullHangul) => {
  if (fullHangul) {
    return INITIAL_HANGUL[Math.floor((fullHangul.charCodeAt() - '가'.charCodeAt()) / 588)];
  }
}

const SearchingPokemons = () => {
  const [nameToId, names] = useMemo(makeCustomData, []);

  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [matchedDataList, setMatchedDataList] = useState([]);
  const [focusedListIndex, setFocusedListIndex] = useState(-1);

  const inputRef = useRef();
  const [isFocusInput, setIsFocusInput] = useState(false);

  const resetFocusedListIndex = () => {
    setFocusedListIndex(-1);
  }

  const onClickButton = (e) => {
    e.preventDefault();

    let focusedData;
    if (focusedListIndex === -1) {
      focusedData = inputValue;
    } else {
      focusedData = matchedDataList[focusedListIndex];
      setInputValue(focusedData);
    }

    const searchedId = nameToId[focusedData];
    if (searchedId) {
      setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedId}.png`);
    } else {
      setImgURL('./image/no-result.jpg');
    }

    resetFocusedListIndex();
    inputRef.current.focus();
    setMatchedDataList([]);
  }

  const onChangeInput = (e) => {
    resetFocusedListIndex();
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

  const onKeyDownInput = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setFocusedListIndex((prevFocusedListIndex) => {
          if (prevFocusedListIndex > 0) {
            return prevFocusedListIndex - 1;
          }
          return matchedDataList.length - 1;
        });
        break;
      case 'ArrowDown':
        setFocusedListIndex((prevFocusedListIndex) => {
          if (prevFocusedListIndex < matchedDataList.length - 1) {
            return prevFocusedListIndex + 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }

  const onFocusInput = () => {
    setIsFocusInput(true);
  }

  const onBlurInput = () => {
    resetFocusedListIndex();
    setIsFocusInput(false);
  }

  const isMatchedDataByFullHangul = (name, value) => {
    let flag = value[0] === name[0];
    for (let i = 1; i < value.length; i++) {
      flag = flag && (value[i] === name[i]);
    }
    return flag;
  }

  const isMatchedDataByInitialHangul = (name, value) => {
    let flag = value[0] === getInitialFromFullHangul(name[0]);
    for (let i = 1; i < value.length; i++) {
      flag = flag && (value[i] === getInitialFromFullHangul(name[i]));
    }
    return flag;
  }

  return (
    <>
      <form>
        <input type="text" ref={inputRef} value={inputValue} onChange={onChangeInput}
          onKeyDown={onKeyDownInput} onFocus={onFocusInput} onBlur={onBlurInput} />
        <button onClick={onClickButton}>검색</button>
      </form>
      {(isFocusInput && matchedDataList.length) ?
        <div css={matchedDataListStyle}>
          {matchedDataList.map((data, index) =>
            <div key={data + index} css={index === focusedListIndex ? foucsedDataStyle : false}>{data}</div>)}
        </div> : false}
      <div>
        <img src={imgURL} />
      </div>
    </>
  );
}

export default SearchingPokemons;