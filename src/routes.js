import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import CustomerListPageContainer from './containers/CustomerListPageContainer';
import CustomerPageContainer from './containers/CustomerPageContainer';
import CustomerAddContainer from './containers/CustomerAddContainer';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage} />
        <Route path="customers" component={CustomerListPageContainer} />
        <Route path="customers/:id" component={CustomerPageContainer} />
        <Route path="customer" component={CustomerAddContainer} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;
