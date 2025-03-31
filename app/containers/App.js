import { connect } from 'react-redux'
import CurrencyConverter from '@/components/CurrencyConverter'

import DateChooser from '@/components/DateChooser';
import Currency from '@/components/Currency';


const mapStateToProps = (state) => {
  return {
    dates: state.data.dates,
    currencies: state.data.currencies
  };
}

const App = connect(
  mapStateToProps,
)(CurrencyConverter)

export default App
