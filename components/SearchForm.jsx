import React, { useMemo, useRef, useState, useCallback } from 'react';
import PokemonData, { PokemonInfoEnglishToKorean } from '../PokemonData';
import MatchedDataList from './MatchedDataList';

import P from '../pokeAPI-config';

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


const SearchForm = ({ setSearchInfo }) => {
  const [nameToId, names] = useMemo(makeCustomData, []);

  const [inputValue, setInputValue] = useState('');
  const [matchedDataList, setMatchedDataList] = useState([]);
  const [focusedListIndex, setFocusedListIndex] = useState(-1);

  const inputRef = useRef();
  const [isFocusInput, setIsFocusInput] = useState(false);

  const resetFocusedListIndex = useCallback(() => {
    setFocusedListIndex(-1);
  }, []);

  const onClickButton = useCallback((e) => {
    e.preventDefault();

    let searchedName = null;
    if (focusedListIndex === -1) {
      searchedName = inputValue;
    } else {
      searchedName = matchedDataList[focusedListIndex];
      setInputValue(searchedName);
    }
    let searchedId = nameToId[searchedName];

    let name = '';
    if (searchedId) { // 검색되는 포켓몬 아이디가 있을때
      P.getPokemonByName(searchedId)
        .then(function (response) {
          console.log(response);
          name = response.name;
          setSearchInfo((prevSearchInfo) => {
            return {
              ...prevSearchInfo, name: searchedName,
              id: searchedId,
              imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedId}.png`,
              height: response.height,
              weight: response.weight,
              types: response.types.map((type) => PokemonInfoEnglishToKorean[type.type.name]),
              stats: response.stats.map((stat) => ({ name: PokemonInfoEnglishToKorean[stat.stat.name], base_stat: stat.base_stat })),
            };
          })
        }).catch(error => console.log(error));
    } else { // 검색되는 포켓몬 아이디가 없을때
      setSearchInfo({
        name: `${searchedName}라는 포켓몬은 없습니다.`,
        imgURL: './image/no-result.jpg',
      });
    }

    resetFocusedListIndex();
    inputRef.current.focus();
    setMatchedDataList([]);
  }, [inputValue, focusedListIndex]);

  const onChangeInput = useCallback((e) => {
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
  }, [names.length]);

  const onKeyDownInput = useCallback((e) => {
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
  }, [matchedDataList.length]);

  const onFocus = useCallback(() => {
    setIsFocusInput(true);
  }, []);

  const onBlur = useCallback(() => {
    resetFocusedListIndex();
    setIsFocusInput(false);
  }, []);

  return (
    <form tabIndex={-1} onFocus={onFocus} onBlur={onBlur}>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
      />
      <button onClick={onClickButton}>검색</button>
      {(isFocusInput && matchedDataList.length)
        ? <MatchedDataList
          dataArr={matchedDataList}
          focusedListIndex={focusedListIndex}
          setInputValue={setInputValue}
          onClickButton={onClickButton}
        />
        : false}
    </form >
  )
}

export default SearchForm;