import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MyContext from './context/myContext';
import MyState from './context/myState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <MyState>
    <App />
    </MyState>
  </Provider>
);


reportWebVitals();
