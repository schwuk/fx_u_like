import { connect } from 'react-redux';

import { setDate } from '../store/actions';

import DateChooser from '../components/DateChooser';


const mapStateToProps = (state) => {
  return {
    dates: state.data.dates,
    startDate: state.data.startDate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (date) => {
      dispatch(setDate(date.format('YYYY-MM-DD')));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(DateChooser)
