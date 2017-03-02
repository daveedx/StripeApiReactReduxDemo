/*
 * action types
 */
export const CLEAR_GLOBAL_MESSAGES = 'CLEAR_GLOBAL_MESSAGES';
export const DISPLAY_ERROR_MESSAGE = 'DISPLAY_ERROR_MESSAGE';
export const DISPLAY_SUCCESS_MESSAGE = 'DISPLAY_SUCCESS_MESSAGE';
export const SET_PROGRESS_BAR_VISIBILITY = 'SET_PROGRESS_BAR_VISIBILITY';

/*
 * other constants
 */
export const ProgressBarVisibilities = {
    SHOWN: 'SHOWN',
    HIDDEN: 'HIDDEN'
};

/*
 * action creators
 */
export const clearGlobalMessages = () => {
    return {
        type: CLEAR_GLOBAL_MESSAGES
    };
};
export const displayErrorMessage = messageText => {
    return {
        type: DISPLAY_ERROR_MESSAGE,
        messageType: 'error',
        messageText
    };
};
export const displaySuccessMessage = messageText => {
    return {
        type: DISPLAY_SUCCESS_MESSAGE,
        messageType: 'success',
        messageText
    };
};
export const setProgressBarVisibility = visibility => {
    return {
        type: SET_PROGRESS_BAR_VISIBILITY,
        visibility
    };
};
