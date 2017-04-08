import React from 'react';

import CurrencyAmount from '../containers/CurrencyAmount';
import CurrencyChooser from '../containers/CurrencyChooser';

export default class Currency extends React.Component {
  render() {
    const direction = this.props.direction;
    const id = "currency_" + direction;
    return (
      <fieldset id={id}>
        <legend>Convert {direction}:</legend>
        <CurrencyAmount direction={direction} />
        <CurrencyChooser direction={direction} />
      </fieldset>
    );
  }
}
