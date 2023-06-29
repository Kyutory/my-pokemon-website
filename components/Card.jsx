import styled from '@emotion/styled'
import React, { } from 'react';

const Wrapper = styled.div((props) => ({
  width: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '15px',
  border: '2px solid',
  marginBottom: '30px',
  padding: '15px 15px',
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
            borderRadius: '15px',
          }}
        />
      </div>
      {name && <h3>{name}</h3>}
      {children}
    </Wrapper>
  );
}

export default Card;