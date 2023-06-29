import React, { } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const LayoutStyle = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const AppLayout = ({ children }) => {
  return (
    <div css={LayoutStyle}>
      <header>
        <Link to="/"><h1>포켓몬</h1></Link>
      </header>
      <div>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;