import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import PokemonData from './PokemonData'

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
  const inputRef = useRef();

  const onClickStart = () => {
    setIsStart(true);
    pickPokemon();
  }

  const pickPokemon = () => {
    const candidates = [...pokemonIds];
    const chosenId = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
    setChosenPokemon(PokemonData[chosenId]);
    setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${chosenId}.svg`);
    setPokemonIds(candidates);
    console.log(chosenId, PokemonData[chosenId]);
  }


  const onClickAnswerButton = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    pickPokemon();
    setResult(inputValue === chosenPokemon
      ? {
        ox: 'O',
        correctAnswer: chosenPokemon,
        inputValue: inputValue,
      }
      : {
        ox: 'X',
        correctAnswer: chosenPokemon,
        inputValue: inputValue,
      });
    setInputValue('');
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  if (!isStart) {
    return (
      <button onClick={onClickStart} >시작</button>
    );
  } else {
    return (
      <>
        <div>포켓몬 이름 맞추기 게임</div>

        <div>{result.ox} 정답: {result.correctAnswer} 입력: {result.inputValue}</div>
        <div>{chosenPokemon}</div>
        <img />
        <form>
          <span>이름: </span>
          <input ref={inputRef} type="text" value={inputValue} onChange={onChangeInput} />
          <button onClick={onClickAnswerButton} >입력</button>
        </form>
      </>
    );
  }

}

export default GuessingGame;