import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class DateChooser extends React.Component {
  render() {
    var component = <DatePicker className="date_chooser" disabled={true} />
    if (this.props.dates && this.props.startDate) {
      component = React.cloneElement(component, {
        disabled: false,
        selected: moment(this.props.startDate),
        onChange: this.props.handleChange.bind(this),
        includeDates: this.props.dates.map(function(x){return moment(x)})
      });
    }
    return (
      <fieldset id="date_chooser">
        <legend>Date:</legend>
        {component}
      </fieldset>
    );
  }
}
