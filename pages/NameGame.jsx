import React, { useState, useRef, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import PokemonData from '../PokemonData';
import { Helmet } from 'react-helmet';

import TimeBar from '../components/TimeBar';
import AppLayout from '../components/AppLayout';

const bar = keyframes`
  100% {
  width: 0;
  }
`;

const allPokemonIds = Array(1010).fill().map((_, i) => i + 1);

const getRandomPokemonIds = (num) => {
  const randomIds = [];
  for (let i = 0; i < num; i++) {
    const randomId = allPokemonIds.splice(Math.floor(Math.random() * allPokemonIds.length), 1)[0];
    randomIds.push(randomId);
  }
  return randomIds;
}

const NameGame = () => {
  const pokemonIds = useRef([]);
  const [chosenPokemon, setChosenPokemon] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState('');

  const [result, setResult] = useState({});
  const [correctPokemons, setCorrectPokemons] = useState([]);
  const [wrongPokemons, setWrongPokemons] = useState([]);

  const inputRef1 = useRef();
  const inputRef2 = useRef();
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
        inputAnswer: inputValue,
      });
      setWrongPokemons((prevWrongPokemons) => {
        const newWrongPokemons = [...prevWrongPokemons];
        newWrongPokemons.push(chosenPokemon);
        return newWrongPokemons;
      });
      setInputValue('');

      if (pokemonIds.current.length === 0) {
        onClickEnd();
      } else {
        pickPokemon();
      }

    }, 5000);
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [isStart, chosenPokemon]);

  const onClickStart = (e) => { // start or restart
    e.preventDefault();
    if (inputRef2.current.value > 1010 || inputRef2.current.value < 1) {
      alert('1~1010의 숫자를 넣어주세요');
      return;
    }
    setIsStart(true);
    setCorrectPokemons([]);
    setWrongPokemons([]);
    pokemonIds.current = getRandomPokemonIds(inputRef2.current.value);
    pickPokemon();
    timeBarStyle.current.animation = `${bar} 5s linear`;
  }

  const onClickEnd = () => { // quit or finish
    setIsStart(false);
    setChosenPokemon('');
    delete timeBarStyle.current.animation;
  }

  const pickPokemon = () => {
    const chosenId = pokemonIds.current.pop();
    console.log(PokemonData[chosenId]);
    setChosenPokemon(PokemonData[chosenId]);
    setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chosenId}.png`);
  }

  const onClickAnswerButton = (e) => {
    e.preventDefault();
    inputRef1.current.focus();
    setInputValue('');

    if (!isStart) {
      return;
    }

    if (inputValue === chosenPokemon) {
      setResult({
        ox: 'O',
        correctAnswer: chosenPokemon,
        inputAnswer: inputValue,
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
        inputAnswer: inputValue,
      });
      setWrongPokemons((prevWrongPokemons) => {
        const newWrongPokemons = [...prevWrongPokemons];
        newWrongPokemons.push(chosenPokemon);
        return newWrongPokemons;
      });
    }

    if (pokemonIds.current.length === 0) {
      onClickEnd();
    } else {
      pickPokemon();
    }
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <AppLayout>
      <Helmet>
        <title>포켓몬 | 이름게임</title>
      </Helmet>
      <form>
        <input type="number" ref={inputRef2} defaultValue={30} placeholder={'1010까지'} />
        <button onClick={onClickStart}>시작</button>
      </form>
      <button onClick={onClickEnd}>그만하기</button>
      <TimeBar css={timeBarStyle.current} chosenPokemon={chosenPokemon} />
      <div>포켓몬 이름 맞추기 게임</div>

      <div>{result.ox} 정답: {result.correctAnswer} 입력: {result.inputAnswer}</div>
      <div>{chosenPokemon}</div>
      <img src={imgURL} />
      <form>
        <span>이름: </span>
        <input type="text" ref={inputRef1} value={inputValue} onChange={onChangeInput} />
        <button onClick={onClickAnswerButton} >입력</button>
      </form>
      <div>맞춘 포켓몬: ({correctPokemons.length}) {correctPokemons.join(' ')}</div>
      <div>틀린 포켓몬: ({wrongPokemons.length}) {wrongPokemons.join(' ')}</div>
      <div>진행률 {`${correctPokemons.length + wrongPokemons.length}/${inputRef2.current?.value || 1010}`}</div>
    </AppLayout>
  );
}

export default NameGame;