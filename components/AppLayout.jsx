import React, { } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Wrapper = styled.div({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const AppLayout = ({ children }) => {
  return (
    <Wrapper>
      <header>
        <Link to="/"><h1>포켓몬</h1></Link>
      </header>
      <div>
        {children}
      </div>
    </Wrapper>
  );
}

export default AppLayout;