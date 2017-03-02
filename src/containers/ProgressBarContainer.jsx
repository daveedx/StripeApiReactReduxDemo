import { connect } from 'react-redux';
import { ProgressBarVisibilities } from '../actions';
import ProgressBar from '../components/ProgressBar';

const { SHOWN } = ProgressBarVisibilities;

const mapStateToProps = state => {
    return {
        visible: state.progressBarVisibility === SHOWN ? true : false
    };
};

export default connect(
    mapStateToProps
)(ProgressBar);
