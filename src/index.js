//react
import React from 'react';
import App from './App';



import ReactDOM from 'react-dom/client';

//react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//react-redux
import { Provider } from 'react-redux';

import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);