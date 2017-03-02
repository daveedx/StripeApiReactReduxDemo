import './stylesheets/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AppRoutes />
        </Provider>,
        document.getElementById('root')
    );
};
