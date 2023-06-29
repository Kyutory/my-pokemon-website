import React, { useEffect, memo } from "react";
import styled from '@emotion/styled';

const Wrapper = styled.div({
  width: '100%',
  border: '1px solid'
});

const TimeBar = ({ className, chosenPokemon }) => {

  useEffect(() => {
    const target = document.querySelector(`.${className}`);
    if (target) {
      target.classList.remove(className);
      void target.offsetWidth;
      target.classList.add(className);
    }
  }, [chosenPokemon]);

  return (
    <Wrapper>
      <div css={className}></div>
    </Wrapper>
  );
};

export default memo(TimeBar);