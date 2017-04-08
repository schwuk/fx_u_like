import React from 'react';

export default class CurrencyAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.direction === 'to' ? props.toAmount : props.fromAmount};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      var value = this.props.direction === 'to' ? nextProps.toAmount : nextProps.fromAmount;
      this.setState({value: value});
  }

  handleChange(event) {
    const value = event.target.value === "" ? 0 : parseFloat(event.target.value);
    this.setState({value: value});
    this.props.handleChange(this.props.direction, value);
  }

  render() {
    const readOnly = this.props.direction === 'to' ? true : false;
    return (
      <input
        type={"number"}
        min={1}
        value={this.state.value}
        disabled={readOnly}
        onChange={this.handleChange}
      />
    );
  }
}
