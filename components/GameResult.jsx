import React, { } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  width: '100%',
  backgroundColor: 'teal',
  textAlign: 'center',
  borderRadius: '0 0 10px 10px',
});

const GameResult = ({ correctAnswers, wrongAnswers }) => {
  return (
    <Wrapper>
      <h4>게임결과</h4>
      <div>맞춘 포켓몬: {correctAnswers.length}</div>
      <div>틀린 포켓몬: {wrongAnswers.length}</div>
    </Wrapper>
  )
}

export default GameResult;