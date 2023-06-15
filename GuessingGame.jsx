import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import PokemonData from './PokemonData'
import TimeBar from './TimeBar';

const bar = keyframes`
  100% {
  width: 0;
  }
`;

const getPokemonIds = () => {
  return Array(100).fill().map((_, i) => i + 1);
}

const GuessingGame = () => {

  const [pokemonIds, setPokemonIds] = useState(getPokemonIds);
  const [chosenPokemon, setChosenPokemon] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [result, setResult] = useState({});


  const [correctPokemons, setCorrectPokemons] = useState([]);
  const [wrongPokemons, setWrongPokemons] = useState([]);
  const inputRef = useRef();
  const timeoutId = useRef();

  const timeBarStyle = useRef({
    background: 'black',
    width: '200px',
    height: '50px',
  });


  useEffect(() => {
    if (!isStart) {
      return;
    }

    timeoutId.current = setTimeout(() => {
      setResult({
        ox: 'X',
        correctAnswer: chosenPokemon,
        inputValue: inputValue,
      });
      setWrongPokemons((prevWrongPokemons) => {
        const newWrongPokemons = [...prevWrongPokemons];
        newWrongPokemons.push(chosenPokemon);
        return newWrongPokemons;
      });
      setInputValue('');
      pickPokemon();
    }, 5000);
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [isStart, chosenPokemon]);

  const onClickStart = () => {
    setIsStart(true);
    setCorrectPokemons([]);
    setWrongPokemons([]);
    pickPokemon();
    timeBarStyle.current.animation = `${bar} 5s linear`;
  }

  const onClickQuit = () => {
    setIsStart(false);
    delete timeBarStyle.current.animation;
  }

  const pickPokemon = () => {
    const candidates = [...pokemonIds];
    const chosenId = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    setChosenPokemon(PokemonData[chosenId]);
    setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${chosenId}.svg`);
    setPokemonIds(candidates);
  }


  const onClickAnswerButton = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    setInputValue('');

    if (!isStart) {
      return;
    }

    if (inputValue === chosenPokemon) {
      setResult({
        ox: 'O',
        correctAnswer: chosenPokemon,
        inputValue: inputValue,
      });
      setCorrectPokemons((prevCorrectPokemons) => {
        const newCorrectPokemons = [...prevCorrectPokemons];
        newCorrectPokemons.push(chosenPokemon);
        return newCorrectPokemons;
      });
    } else {
      setResult({
        ox: 'X',
        correctAnswer: chosenPokemon,
        inputValue: inputValue,
      });
      setWrongPokemons((prevWrongPokemons) => {
        const newWrongPokemons = [...prevWrongPokemons];
        newWrongPokemons.push(chosenPokemon);
        return newWrongPokemons;
      });
    }
    pickPokemon();
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <>
      <TimeBar css={timeBarStyle.current} chosenPokemon={chosenPokemon} />
      <div>포켓몬 이름 맞추기 게임</div>

      <div>{result.ox} 정답: {result.correctAnswer} 입력: {result.inputValue}</div>
      <div>{chosenPokemon}</div>
      <img />
      <form>
        <span>이름: </span>
        <input ref={inputRef} type="text" value={inputValue} onChange={onChangeInput} />
        <button onClick={onClickAnswerButton} >입력</button>
      </form>
      <div>맞춘 포켓몬: ({correctPokemons.length}) {correctPokemons.join(' ')}</div>
      <div>틀린 포켓몬: ({wrongPokemons.length}) {wrongPokemons.join(' ')}</div>
      <div>진행률 {`${correctPokemons.length + wrongPokemons.length}/1010`}</div>
      <button onClick={onClickStart}>시작</button>
      <button onClick={onClickQuit}>그만하기</button>
    </>
  );
}

export default GuessingGame;