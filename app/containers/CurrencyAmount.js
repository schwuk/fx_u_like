import { connect } from 'react-redux';

import { setFromAmount, setToAmount } from '../store/actions';

import CurrencyAmount from '../components/CurrencyAmount';


const mapStateToProps = (state) => {
  return {
    fromAmount: state.convert.fromAmount,
    toAmount: state.convert.toAmount
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (direction, value) => {
      if (direction === 'from') {
        dispatch(setFromAmount(value));
      } else {
        dispatch(setToAmount(value));
      }
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CurrencyAmount)
