import React, { PropTypes } from 'react';

let ProgressBar = ({ visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="progress-bar-overlay">
            <div className="progress-bar">
                <div className="indeterminate"></div>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    visible: PropTypes.bool.isRequired
};

export default ProgressBar;
