import styled from '@emotion/styled'
import React, { } from 'react';

const Wrapper = styled.div((props) => ({
  width: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '15%',
  border: '3px solid',
  background: props.color,
}));


const Card = ({ children, name, imgSrc, color }) => {
  return (
    <Wrapper color={color}>
      <div>
        <img
          src={imgSrc}
          alt='이미지가 없습니다'
          style={{
            width: '180px',
            borderRadius: '15%',
          }}
        />
      </div>
      <h3>{name}</h3>
      {children}
    </Wrapper>
  );
}

export default Card;