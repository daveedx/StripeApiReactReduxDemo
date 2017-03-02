import React, { PropTypes } from 'react';
import CustomerFormContainer from '../../containers/CustomerFormContainer';

const CustomerPage = props => {
    const { customer, submitCustomerForm, deleteCustomer } = props;

    if (customer === null) {
        return null;
    }

    if (!Object.keys(customer).length) {
        return (
            <div className="customer-page">
                <h1 className="title is-1 has-text-centered">Customer Details</h1>
            </div>
        );
    }

    return (
        <div className="customer-page">
            <h1 className="title is-1 has-text-centered">Customer Details</h1>

            <div className="columns">
                <div className="left-column column is-4">
                    <h2 className="title is-4 has-text-centered">Read Data</h2>

                    <div className="panel">
                        <p className="panel-heading">E-mail</p>

                        <div className="panel-block">
                            <p>{ customer.email }</p>
                        </div>
                    </div>

                    <div className="panel">
                        <p className="panel-heading">First Name</p>

                        <div className="panel-block">
                            <p>{ customer.metadata.first_name || '' }</p>
                        </div>
                    </div>

                    <div className="panel">
                        <p className="panel-heading">Last Name</p>

                        <div className="panel-block">
                            <p>{ customer.metadata.last_name || '' }</p>
                        </div>
                    </div>

                    <div className="panel">
                        <p className="panel-heading">Balance</p>

                        <div className="panel-block">
                            <p>{ customer.account_balance }</p>
                        </div>
                    </div>

                    <div className="panel">
                        <p className="panel-heading">Description</p>

                        <div className="panel-block">
                            <p>{ customer.description }</p>
                        </div>
                    </div>

                    <br/>
                    <button
                        type="button"
                        className="button-delete button is-danger is-medium"
                        onClick={ e => {
                            e.preventDefault();
                            deleteCustomer(customer);
                        }}>
                            Delete Customer
                        </button>
                </div>

                <div className="column is-4">
                    <h2 className="title is-4 has-text-centered">Edit Data</h2>

                    <CustomerFormContainer
                        customer={ customer }
                        submitCustomerForm={ submitCustomerForm } />
                </div>
            </div>
        </div>
    );
};

CustomerPage.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string,
        description: PropTypes.string,
        account_balance: PropTypes.number,
        metadata: PropTypes.shape({
            first_name: PropTypes.string,
            last_name: PropTypes.string
        })
    }),
    submitCustomerForm: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
};

export default CustomerPage;
