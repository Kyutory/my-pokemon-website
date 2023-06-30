import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import PokemonData from '../PokemonData';
import { Helmet } from 'react-helmet';

import TimeBar from '../components/TimeBar';
import AppLayout from '../components/AppLayout';
import GameCard from '../components/GameCard';
import GameResult from '../components/GameResult';


const Wrapper = styled.div({
  backgroundColor: 'wheat',
  borderRadius: '10px',
  border: '1px solid',
  width: '250px',
  button: {
    borderRadius: '10px',
    border: '1px solid black',
    backgroundColor: 'tomato',
  },
  h3: {
    textAlign: 'center',
  },
  form: {
    textAlign: 'center',
    margin: '20px 0',
  },
  input: {
    width: '50%',
    border: '1px solid black',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '0 5px',
  },
});

const bar = keyframes`
  100% {
  width: 0;
  }
`;

const getRandomPokemonIds = (num) => {
  const allPokemonIds = Array(1010).fill().map((_, i) => i + 1);
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

  const [lastResult, setLastResult] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const inputRef = useRef();
  const inputRef2 = useRef();
  const timeoutId = useRef();
  const timeout2Id = useRef();

  const timeBarStyle = useRef({
    background: 'red',
    width: '100%',
    height: '20px',
  });

  useEffect(() => {
    if (!isStart) {
      return;
    }

    timeoutId.current = setTimeout(() => {
      setLastResult({
        ox: 'X',
        correctAnswer: chosenPokemon,
        userAnswer: inputValue,
      });
      setWrongAnswers((prevWrongPokemons) => {
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

  const onClickStart = useCallback((e) => { // start or restart
    e.preventDefault();
    clearTimeout(timeout2Id.current);
    if (inputRef2.current.value > 1010 || inputRef2.current.value < 1) {
      alert('1~1010의 숫자를 넣어주세요');
      return;
    }
    setIsStart(true);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setLastResult([]);
    pokemonIds.current = getRandomPokemonIds(inputRef2.current.value);
    pickPokemon();
    timeBarStyle.current.animation = `${bar} 5s linear`;
  }, [])

  const onClickQuit = useCallback(() => {
    delete timeBarStyle.current.animation;
    setIsStart(false);
    setChosenPokemon('');
  }, []);

  const onClickEnd = useCallback(() => {
    delete timeBarStyle.current.animation;
    timeout2Id.current = setTimeout(() => {
      setIsStart(false);
      setChosenPokemon('');
    }, 2500);
  }, []);

  const pickPokemon = useCallback(() => {
    const chosenId = pokemonIds.current.pop();
    console.log(PokemonData[chosenId]);
    setChosenPokemon(PokemonData[chosenId]);
    setImgURL(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chosenId}.png`);
  }, []);

  const onClickAnswerButton = useCallback((e) => {
    e.preventDefault();
    inputRef.current.focus();
    setInputValue('');

    if (!isStart) {
      return;
    }

    if (inputValue === chosenPokemon) {
      setLastResult({
        ox: 'O',
        correctAnswer: chosenPokemon,
        userAnswer: inputValue,
      });
      setCorrectAnswers((prevCorrectPokemons) => {
        const newCorrectPokemons = [...prevCorrectPokemons];
        newCorrectPokemons.push(chosenPokemon);
        return newCorrectPokemons;
      });
    } else {
      setLastResult({
        ox: 'X',
        correctAnswer: chosenPokemon,
        userAnswer: inputValue,
      });
      setWrongAnswers((prevWrongPokemons) => {
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
  }, [isStart, inputValue, chosenPokemon]);

  const onChangeInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (

    <AppLayout>
      <Helmet>
        <title>포켓몬 | 이름게임</title>
      </Helmet>
      <Wrapper>
        <h3>포켓몬 이름 맞추기 게임</h3>
        <form>
          <label>
            마리:
            <input type="number" ref={inputRef2} defaultValue={5} placeholder={'1~1010'} />
          </label>
          <button onClick={onClickStart}>시작</button>
        </form>
        <TimeBar css={timeBarStyle.current} chosenPokemon={chosenPokemon} />
        {isStart && <GameCard imgSrc={imgURL} lastResult={lastResult}></GameCard>}
        <form>
          <label>
            이름:
            <input name="input1" type="text" ref={inputRef} value={inputValue} onChange={onChangeInput} />
          </label>
          <button onClick={onClickAnswerButton} >입력</button>
        </form>
        <button style={{ marginLeft: '10px' }} onClick={onClickQuit}>그만하기</button>
        <div style={{ marginLeft: '10px' }} >진행률 {`${correctAnswers.length + wrongAnswers.length}/${inputRef2.current?.value || 1010}`}</div>
        {!isStart &&
          <GameResult
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />}
      </Wrapper>
    </AppLayout>
  );
}

export default NameGame;