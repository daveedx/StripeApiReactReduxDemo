import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import GlobalMessagesContainer from '../containers/GlobalMessagesContainer';
import ProgressBarContainer from '../containers/ProgressBarContainer';

const Layout = props => {
    return (
        <section className="app-container">
            <ProgressBarContainer />

            <header>
                <NavBar />
            </header>

            <GlobalMessagesContainer />

            <div className="container is-fluid app-content">
                { React.cloneElement(props.children, props) }
            </div>
        </section>
    );
};

Layout.PropTypes = {
    children: PropTypes.node
};

export default Layout;
