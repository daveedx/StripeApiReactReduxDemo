import React, { PropTypes } from 'react';

let GlobalMessages = ({ globalMessages, hideGlobalMessages }) => {
    const { messageType, messageText } = globalMessages,
        alertClass = messageType === 'error' ? 'is-danger' : 'is-success';

    if (messageType === '' && messageText === '') {
        return null;
    }

    return (
        <div className={ `global-messages notification ${alertClass}` }>
            <button className="delete" onClick={ hideGlobalMessages }></button>
            { messageText }
        </div>
    );
};

GlobalMessages.propTypes = {
    messageType: PropTypes.string,
    messageText: PropTypes.string,
    hideGlobalMessages: PropTypes.func.isRequired
};


export default GlobalMessages;
