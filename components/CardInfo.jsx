import React, { } from 'react';
import { css } from '@emotion/react';

const CardInfo = ({ searchInfo }) => {
  const { types, height, weight, stats } = searchInfo;
  return (
    searchInfo ? <>
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
    </> : false
  );
}

export default CardInfo;