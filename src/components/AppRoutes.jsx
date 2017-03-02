import React from 'react';
import { Router } from 'react-router';
import routes from '../routes';
import { history } from '../store';

const AppRoutes = () => {
    return (
        <Router
            history={ history }
            routes={ routes }
            onUpdate={() => window.scrollTo(0, 0)} />
    );
};

export default AppRoutes;
