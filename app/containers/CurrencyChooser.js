import { connect } from 'react-redux';

import { setFromCurrency, setToCurrency } from '@/store/actions';

import CurrencyChooser from '@/components/CurrencyChooser';


const mapStateToProps = (state) => {
    return {
      currencies: state.data.currencies,
      fromCurrency: state.convert.fromCurrency,
      toCurrency: state.convert.toCurrency
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (direction, value) => {
      if (direction === 'from') {
        dispatch(setFromCurrency(value));
      } else {
        dispatch(setToCurrency(value));
      }
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CurrencyChooser)
