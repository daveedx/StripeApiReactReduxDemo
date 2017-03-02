import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import {
    setProgressBarVisibility,
    ProgressBarVisibilities,
    clearGlobalMessages,
    displayErrorMessage,
    displaySuccessMessage
} from '../actions';
import CustomerPage from '../components/customer/CustomerPage';

const { SHOWN, HIDDEN } = ProgressBarVisibilities;

class CustomerPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: null
        };

        this._updateCustomerState = this._updateCustomerState.bind(this);
        this._updateCustomer = this._updateCustomer.bind(this);
        this._deleteCustomer = this._deleteCustomer.bind(this);
    }

    _updateCustomerState(customer) {
        this.setState({
            customer
        });
    }

    _deleteCustomer(customer) {
        if (confirm('Are you sure you want to delete this customer?')) {
            this.props.deleteCustomer(customer).then(success => {
                if (success === true) {
                    this.setState({
                        customer: {}
                    });
                }
            });
        }
    }

    _updateCustomer(customer) {
        this.props.updateCustomer(customer).then(success => {
            if (success === true) {
                this._updateCustomerState(customer);
            }
        });
    }

    componentWillMount() {
        this.props.getCustomer(this.props.params.id).then(customer => {
            this._updateCustomerState(customer);
        });
    }

    render() {
        return (
            <CustomerPage
                customer={ this.state.customer }
                submitCustomerForm={ this._updateCustomer }
                deleteCustomer={ this._deleteCustomer } />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomer(customerId) {
            dispatch(setProgressBarVisibility(SHOWN));

            return axios.get(`/api/customers/${customerId}`)
                .then(response => {
                    let customer = {};

                    if (response.data.err !== '') {
                        dispatch(displayErrorMessage(response.data.err));
                    } else if (response.data.resp.deleted === true) {
                        dispatch(displayErrorMessage('This customer has been deleted.'));
                    } else {
                        customer = response.data.resp;
                    }

                    dispatch(setProgressBarVisibility(HIDDEN));

                    return customer;
                })
                .catch(err => {
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return {};
                });
        },
        deleteCustomer(customer) {
            const deleteButtonClassList = document.querySelector('.button-delete').classList;
            
            deleteButtonClassList.add('is-loading');
            deleteButtonClassList.add('is-disabled');
            dispatch(setProgressBarVisibility(SHOWN));

            return axios.delete(`/api/customers/${customer.id}`)
                .then(response => {
                    const redirectTime = 5000;
                    let success = false;

                    if (response.data.err !== '') {
                        dispatch(displayErrorMessage(response.data.err));
                    } else {
                        dispatch(displaySuccessMessage('Customer has been deleted successfully. You will be redirected to the list page in 5 secs.'));
                        success = true;

                        setTimeout(() => {
                            browserHistory.push('/customers');
                        }, redirectTime);
                    }

                    deleteButtonClassList.remove('is-loading');
                    deleteButtonClassList.remove('is-disabled');
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return success;
                })
                .catch(err => {
                    deleteButtonClassList.remove('is-loading');
                    deleteButtonClassList.remove('is-disabled');
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return false;
                });
        },
        updateCustomer(customer) {
            const updateButtonClassList = document.querySelector('.button-save').classList;
            
            updateButtonClassList.add('is-loading');
            updateButtonClassList.add('is-disabled');
            dispatch(clearGlobalMessages());
            dispatch(setProgressBarVisibility(SHOWN));

            return axios.put(`/api/customers/${customer.id}`, customer)
                .then(response => {
                    let success = false;

                    if (response.data.err !== '') {
                        dispatch(displayErrorMessage(response.data.err));
                    } else {
                        dispatch(displaySuccessMessage('Customer has been updated successfully.'));
                        success = true;
                    }

                    updateButtonClassList.remove('is-loading');
                    updateButtonClassList.remove('is-disabled');
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return success;
                })
                .catch(err => {
                    updateButtonClassList.remove('is-loading');
                    updateButtonClassList.remove('is-disabled');
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return false;
                });
        }
    };
};

CustomerPageContainer.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    getCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(CustomerPageContainer);
