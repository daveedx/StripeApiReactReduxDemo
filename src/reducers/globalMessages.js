import { CLEAR_GLOBAL_MESSAGES, DISPLAY_ERROR_MESSAGE, DISPLAY_SUCCESS_MESSAGE } from '../actions';

const globalMessages = (state = {
    messageType: '',
    messageText: ''
}, action) => {
    switch (action.type) {
        case CLEAR_GLOBAL_MESSAGES:
            return Object.assign({}, state, {
                messageType: '',
                messageText: ''
            });

        case DISPLAY_ERROR_MESSAGE:
        case DISPLAY_SUCCESS_MESSAGE:
            return Object.assign({}, state, {
                messageType: action.messageType,
                messageText: action.messageText
            });

        default:
            return state;
    }
};

export default globalMessages;
