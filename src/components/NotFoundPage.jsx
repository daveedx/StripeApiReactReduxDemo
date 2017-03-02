import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1 className="page-title">404 Not Found</h1>
            <p><Link to="/">Go back to the main page</Link></p>
        </div>
    );
};

export default NotFoundPage;
