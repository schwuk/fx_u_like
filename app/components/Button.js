import React from 'react';
import axios from 'axios';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const url = "/rate/" + this.props.date + "/" + this.props.fromCurrency +
      "/" + this.props.toCurrency;

    var rate = 1.0;
    axios.get(url).then(response => {
      rate = response.data;
      var result = this.props.fromAmount * rate;
      this.props.handleResult(result.toFixed(2));
    });
  }

  render() {
    const title = this.props.title;
    return (
      <button onClick={this.handleClick}>
        {title}
      </button>
    );
  }
}
