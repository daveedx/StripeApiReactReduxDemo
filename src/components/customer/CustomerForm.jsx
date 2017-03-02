import React, { PropTypes } from 'react';

const CustomerForm = props => {
    const {
        customer,
        onChangeEmail,
        onChangeFirstName,
        onChangeLastName,
        onChangeAccountBalance,
        onChangeDescription,
        submitCustomerForm
    } = props,
        submitButtonLabel = customer.id ? 'Update Customer' : 'Save Customer';

    return (
        <form onSubmit={ e => {
            e.preventDefault();
            submitCustomerForm();
        }}>
            <div className="panel">
                <p className="panel-heading">
                    <label htmlFor="email" className="label">E-mail</label>
                </p>

                <div className="panel-block">
                    <p className="control">
                        <input
                            type="email"
                            className="input"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            required
                            value={ customer.email }
                            onChange={ onChangeEmail } />
                    </p>
                </div>
            </div>

            <div className="panel">
                <p className="panel-heading">
                    <label htmlFor="first_name" className="label">First Name</label>
                </p>

                <div className="panel-block">
                    <p className="control">
                        <input
                            type="text"
                            className="input"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            required
                            value={ customer.metadata.first_name }
                            onChange={ onChangeFirstName } />
                    </p>
                </div>
            </div>

            <div className="panel">
                <p className="panel-heading">
                    <label htmlFor="first_name" className="label">Last Name</label>
                </p>

                <div className="panel-block">
                    <p className="control">
                        <input
                            type="text"
                            className="input"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            required
                            value={ customer.metadata.last_name }
                            onChange={ onChangeLastName } />
                    </p>
                </div>
            </div>

            <div className="panel">
                <p className="panel-heading">
                    <label htmlFor="account_balance" className="label">Balance</label>
                </p>

                <div className="panel-block">
                    <p className="control">
                        <input
                            type="number"
                            min="1"
                            className="input"
                            id="account_balance"
                            name="account_balance"
                            placeholder="Balance"
                            required
                            value={ customer.account_balance }
                            onChange={ onChangeAccountBalance } />
                    </p>
                </div>
            </div>

            <div className="panel">
                <p className="panel-heading">
                    <label htmlFor="description" className="label">Description</label>
                </p>

                <div className="panel-block">
                    <p className="control">
                        <textarea
                            className="textarea"
                            id="description"
                            name="description"
                            placeholder="Description"
                            required
                            value={ customer.description }
                            onChange={onChangeDescription}></textarea>
                    </p>
                </div>
            </div>

            <br />
            <button type="submit" className="button-save button is-info is-medium">{ submitButtonLabel }</button>
        </form>
    );
};

CustomerForm.propTypes = {
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
    onChangeEmail: PropTypes.func.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeLastName: PropTypes.func.isRequired,
    onChangeAccountBalance: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    submitCustomerForm: PropTypes.func.isRequired
};

export default CustomerForm;
