import '../src/styles/global.css';
import '../src/styles/normalize.css';
import '../src/styles/reset.css';
import '../src/styles/theme.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { RecoilRoot } from 'recoil';
import { RecoilLogger } from 'recoil-devtools-logger';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <RecoilLogger />
    </RecoilRoot>
  </React.StrictMode>,
);
