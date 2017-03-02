import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    setProgressBarVisibility,
    ProgressBarVisibilities,
    clearGlobalMessages,
    displayErrorMessage,
    displaySuccessMessage
} from '../actions';
import CustomerForm from '../components/customer/CustomerForm';

const { SHOWN, HIDDEN } = ProgressBarVisibilities;

class CustomerFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            email: '',
            metadata: {
                first_name: '',
                last_name: ''
            },
            account_balance: 0,
            description: ''
        };

        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeFirstName = this._onChangeFirstName.bind(this);
        this._onChangeLastName = this._onChangeLastName.bind(this);
        this._onChangeAccountBalance = this._onChangeAccountBalance.bind(this);
        this._onChangeDescription = this._onChangeDescription.bind(this);
        this._submitForm = this._submitForm.bind(this);
    }

    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    _onChangeFirstName(event) {
        const metadata = this.state.metadata;

        metadata.first_name = event.target.value;

        this.setState({
            metadata
        });
    }

    _onChangeLastName(event) {
        const metadata = this.state.metadata;

        metadata.last_name = event.target.value;

        this.setState({
            metadata
        });
    }

    _onChangeAccountBalance(event) {
        this.setState({
            account_balance: parseInt(event.target.value)
        });
    }

    _onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    _submitForm() {
        this.props.submitCustomerForm(this.state);
    }

    componentDidMount() {
        if (this.props.customer) {
            this.setState(this.props.customer);
        }
    }

    render() {
        return(
            <CustomerForm
                customer={ this.state }
                onChangeEmail={ this._onChangeEmail }
                onChangeFirstName={ this._onChangeFirstName }
                onChangeLastName={ this._onChangeLastName }
                onChangeAccountBalance={ this._onChangeAccountBalance }
                onChangeDescription={ this._onChangeDescription }
                submitCustomerForm={ this._submitForm } />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCustomer(customer) {
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

                    dispatch(setProgressBarVisibility(HIDDEN));

                    return success;
                })
                .catch(err => {
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return false;
                });
        }
    };
};

CustomerFormContainer.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        account_balance: PropTypes.number.isRequired,
        metadata: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired
        }).isRequired
    }),
    submitCustomerForm: PropTypes.func
};

export default connect(
    null,
    mapDispatchToProps
)(CustomerFormContainer);