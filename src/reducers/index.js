import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import globalMessages from './globalMessages';
import progressBarVisibility from './progressBarVisibility';

export default combineReducers({
    globalMessages,
    progressBarVisibility,
    routing: routerReducer
});
