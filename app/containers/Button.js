import { connect } from 'react-redux';

import { setToAmount } from '@/store/actions';

import Button from '@/scomponents/Button';


const mapStateToProps = (state) => {
    return {
      date: state.convert.date,
      fromAmount: state.convert.fromAmount,
      fromCurrency: state.convert.fromCurrency,
      toCurrency: state.convert.toCurrency
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleResult: (amount) => {
      dispatch(setToAmount(amount));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Button)
