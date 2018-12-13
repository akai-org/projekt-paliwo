import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Dodawanie.css';

import * as actions from '../../store/actions/index';

class Dodawanie extends Component {

    state = {
        refillForm: {
            ilosc: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ilość zatankowanego paliwa'
                },
                errorMessage: 'Wprowadź własciwe liczbę',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    refillHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.refillForm) {
            formData[formElementIdentifier] = this.state.refillForm[formElementIdentifier].value;
        }
        const refill = {
            refillData: formData
        };
        this.props.onSubmit(refill)
    };

    checkValidity(value, rules) {
        let isValid = true;
        // Dla pola validation, wystarczy dodać na końcu &&isValid
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRefillForm = {
            ...this.state.refillForm
        };
        const updatedFormElement = {
            ...updatedRefillForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRefillForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedRefillForm) {
            formIsValid = updatedRefillForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({refillForm: updatedRefillForm, formIsValid: formIsValid});
    };

    render () {
        const formElementsArray = [];
        for (let key in this.state.refillForm) {
            formElementsArray.push({
                id: key,
                config: this.state.refillForm[key]
            })
        }
        let form = (
            <form onSubmit={this.refillHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMessage}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Dodaj tankowanie</Button>
            </form>
        );
        return (
            <div className={classes.Dodawanie}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (refill) => dispatch(actions.createRefill(refill))
    }
};

export default connect(null, mapDispatchToProps)(Dodawanie);