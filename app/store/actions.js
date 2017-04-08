/*
 * action types
 */

export const SET_DATES = 'SET_DATES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_DATE = 'SET_DATE';
export const SET_FROM_AMOUNT = 'SET_FROM_AMOUNT';
export const SET_FROM_CURRENCY = 'SET_FROM_CURRENCY';
export const SET_TO_AMOUNT = 'SET_TO_AMOUNT';
export const SET_TO_CURRENCY = 'SET_TO_CURRENCY';

/*
 * action creators
 */

export function setDates(dates) {
  return { type: SET_DATES, dates }
}

export function setCurrencies(currencies) {
  return { type: SET_CURRENCIES, currencies }
}

export function setDate(date) {
  return { type: SET_DATE, date }
}

export function setFromAmount(amount) {
  return { type: SET_FROM_AMOUNT, amount }
}

export function setFromCurrency(currency) {
  return { type: SET_FROM_CURRENCY, currency }
}

export function setToAmount(amount) {
  return { type: SET_TO_AMOUNT, amount }
}

export function setToCurrency(currency) {
  return { type: SET_TO_CURRENCY, currency }
}
