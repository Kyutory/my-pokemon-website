import React from 'react';
import ReactDom from 'react-dom/client';
import { css } from '@emotion/react';

import GuessingGame from './GuessingGame';

ReactDom.createRoot(document.querySelector('#root')).render(<GuessingGame />);