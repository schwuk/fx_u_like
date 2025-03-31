import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';
import moment from 'moment';

import App from '@/containers/App';

import fxApp from '@/store/reducers';
import { setDate, setDates, setCurrencies } from '@/store/actions';

const date = moment().format('YYYY-MM-DD');
const preloadedState = {
  'data': {
    'currencies': [],
    'dates': [],
  },
  'convert': {
    'fromAmount': 1,
    'fromCurrency': 'USD',
    'toCurrency': 'GBP'
  }
}

let store = createStore(fxApp, preloadedState);

axios.get('/dates').then(response => {
  store.dispatch(setDates(response.data));
  store.dispatch(setDate(response.data[0]));
});

axios.get('/currencies').then(response => {
  store.dispatch(setCurrencies(response.data));
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    document.getElementById('container')
  );
});
