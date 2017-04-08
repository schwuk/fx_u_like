import React from 'react';

import DateChooser from '../containers/DateChooser';
import Currency from './Currency';
import Button from '../containers/Button';


// CurrencyConverter
// - DateChooser
// - Currency (From)
//  - Amount
//  - CurrencyChooser
// - Currency (To)
//  - Amount (Disabled)
//  - CurrencyChooser


export default class CurrencyConverter extends React.Component {
  render() {
    return(
      <div id="currency_converter">
        <h1>FX-u-like</h1>
        <DateChooser />
        <Currency direction="from" />
        <Currency direction="to" />
        <Button title="Convert!" />
      </div>
    )
  }
}
