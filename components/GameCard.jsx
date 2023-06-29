import React, { } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(() => ({
  backgroundColor: '#D5FED3',
  width: '100%',
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',
  img: {
    width: '80%',
  },
}));

const LastResult = styled.div(() => ({
  backgroundColor: 'tomato',
  width: '100%',
  display: "flex",
  justifyContent: 'space-around'
}));

const GameCard = ({ imgSrc, lastResult }) => {
  const { ox, correctAnswer, userAnswer } = lastResult

  return (
    <Wrapper >
      {ox && <LastResult>
        <div>{ox === 'O' ? `정답입니다!` : `틀렸습니다 정답은 "${correctAnswer}"`}</div>
      </LastResult>}
      {<img src={imgSrc} alt="사진이 없습니다"></img>}
    </Wrapper >
  );
}

export default GameCard;