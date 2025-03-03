import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { assertNotNull } from './lib/typeHelpers';
import { store } from './redux/store';
import App from './App';

import './index.css';

const root = document.getElementById('root');

assertNotNull(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
