import { connect } from 'react-redux';
import {
    clearGlobalMessages,
} from '../actions';
import GlobalMessages from '../components/GlobalMessages';

const mapStateToProps = state => {
    return {
        globalMessages: state.globalMessages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hideGlobalMessages() {
            dispatch(clearGlobalMessages());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalMessages);
