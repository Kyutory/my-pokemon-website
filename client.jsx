import React from 'react';
import ReactDom from 'react-dom/client';
import { css } from '@emotion/react';

const Test = () => {
  return <div css={{ color: 'green' }}>test</div>
}

ReactDom.createRoot(document.querySelector('#root')).render(<Test />);