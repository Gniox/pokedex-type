import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchGenerations } from './store/fetchGenerations';
import { fetchPokemon } from './store/fetchPokemon';
import { fetchIndividualPokemon } from './store/fetchIndividualPokemon';

store.dispatch(fetchGenerations());
store.dispatch(fetchPokemon(1));
store.dispatch(fetchIndividualPokemon(1));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
