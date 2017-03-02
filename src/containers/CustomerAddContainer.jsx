import React from 'react';
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
import CustomerAddPage from '../components/customer/CustomerAddPage';

const { SHOWN, HIDDEN } = ProgressBarVisibilities;

class CustomerAddContainer extends React.Component {
    constructor(props) {
        super(props);

        this._addCustomer = this._addCustomer.bind(this);
    }

    _addCustomer(customer) {
        this.props.addCustomer(customer);
    }

    render() {
        return (
            <CustomerAddPage
                submitCustomerForm={ this._addCustomer } />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCustomer(customer) {
            const saveButtonClassList = document.querySelector('.button-save').classList;
            
            saveButtonClassList.add('is-loading');
            saveButtonClassList.add('is-disabled');
            dispatch(clearGlobalMessages());
            dispatch(setProgressBarVisibility(SHOWN));

            return axios.post('/api/customers', customer)
                .then(response => {
                    const redirectTime = 5000;

                    if (response.data.err !== '') {
                        dispatch(displayErrorMessage(response.data.err));
                    } else {
                        document.querySelectorAll('input, textarea').forEach(item => {
                            item.value = '';
                        });

                        dispatch(displaySuccessMessage("Customer has been added successfully. You will be redirected to this newly added customer's page in 5 secs."));

                        setTimeout(() => {
                            browserHistory.push(`/customers/${response.data.resp.id}`);
                        }, redirectTime);
                    }

                    saveButtonClassList.remove('is-loading');
                    saveButtonClassList.remove('is-disabled');
                    dispatch(setProgressBarVisibility(HIDDEN));
                })
                .catch(err => {
                    saveButtonClassList.remove('is-loading');
                    saveButtonClassList.remove('is-disabled');
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));
                });
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CustomerAddContainer);
