import { combineReducers } from 'redux'
import { SET_DATES, SET_CURRENCIES, SET_DATE, SET_FROM_AMOUNT, SET_FROM_CURRENCY, SET_TO_AMOUNT, SET_TO_CURRENCY } from './actions'


function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function data(state = [], action ) {
  switch (action.type) {
    case SET_DATE:
      return Object.assign({}, state, {
        startDate: action.date
      });
    case SET_DATES:
      return Object.assign({}, state, {
        dates: action.dates,
        startDate: action.dates[0]
      });
    case SET_CURRENCIES:
      return Object.assign({}, state, {
        currencies: action.currencies
      });
    default:
    return state
  }
}

function convert(state = [], action ) {
  switch (action.type) {
    case SET_DATE:
      return Object.assign({}, state, {
        date: action.date
      });
    case SET_FROM_AMOUNT:
      return Object.assign({}, state, {
        fromAmount: action.amount
      });
    case SET_TO_AMOUNT:
      return Object.assign({}, state, {
        toAmount: action.amount
      });
    case SET_FROM_CURRENCY:
      return Object.assign({}, state, {
        fromCurrency: action.currency
      });
    case SET_TO_CURRENCY:
      return Object.assign({}, state, {
        toCurrency: action.currency
      });
    default:
    return state
  }
}

const fxApp = combineReducers({
  data,
  convert
})

export default fxApp
