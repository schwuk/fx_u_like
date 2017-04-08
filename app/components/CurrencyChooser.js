import React from 'react';

export default class CurrencyChooser extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(this.props.direction, event.target.value);
  }

  render() {
    const value = this.props.direction === 'to' ? this.props.toCurrency : this.props.fromCurrency;
    const options = this.props.currencies.map((currency) =>
      <option key={currency} value={currency}>{currency}</option>
    );
    return (
      <select value={value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}
