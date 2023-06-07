import React, { Children, useEffect, useState, useLayoutEffect } from "react";

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
    <>
      <div css={className}></div>
    </>
  );
};

export default TimeBar;