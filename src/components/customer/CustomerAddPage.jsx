import React, { PropTypes } from 'react';
import CustomerFormContainer from '../../containers/CustomerFormContainer';

const CustomerAddPage = props => {
    return (
        <div className="customer-add">
            <h1 className="title is-1 has-text-centered">Add New Customer</h1>

            <div className="columns">
                <div className="column is-4">
                    <CustomerFormContainer
                        submitCustomerForm={ props.submitCustomerForm } />
                </div>
            </div>
        </div>
    );
};

CustomerAddPage.propTypes = {
    submitCustomerForm: PropTypes.func.isRequired
};

export default CustomerAddPage;
