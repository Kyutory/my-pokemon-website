import React, { } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div((props) => ({

}));

const CardInfo = ({ searchInfo }) => {
  const { types, height, weight, stats } = searchInfo;

  return (
    <Wrapper types={types}>
      <div>
        {types?.map((type) => <div key={type}>{type}</div>)}
      </div>
      <div>
        키: {height}
      </div>
      <div>
        무게: {weight}
      </div>
      {stats?.map((stat, index) =>
        <div key={index}>
          {stat.name}: {stat.base_stat}
        </div>)}
    </Wrapper>
  );
}

export default CardInfo;