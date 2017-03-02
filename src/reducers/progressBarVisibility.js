import { SET_PROGRESS_BAR_VISIBILITY, ProgressBarVisibilities } from '../actions';
const { HIDDEN } = ProgressBarVisibilities;

const progressBarVisibility = (state = HIDDEN, action) => {
    switch (action.type) {
        case SET_PROGRESS_BAR_VISIBILITY:
            return action.visibility;

        default:
            return state;
    }
};

export default progressBarVisibility;
