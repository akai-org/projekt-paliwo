import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Dodawanie.css';

import * as actions from '../../store/actions/index';

class Dodawanie extends Component {

    state = {
        refillForm: {
            data: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Wybierz datę i godzinę tankowania'
                },
                errorMessage: 'Wprowadź właściwą datę',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            rodzaj: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'pb98', displayValue: 'PB98 (paliwo bezołowiowe 98 oktanów)'},
                        {value: 'pb95', displayValue: 'PB95 (paliwo bezołowiowe 95 oktanów)'},
                        {value: 'no', displayValue: 'NO (olej napędowy - diesel)'},
                        {value: 'no-eko', displayValue: 'NO-Eko (ekodiesel)'},
                        {value: 'lpg', displayValue: 'LPG (autogaz)'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            cena: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Cena za 1 litr'
                },
                errorMessage: 'Wprowadź właściwą cenę',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            },
            licznik: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Przebieg pojazdu w momencie tankowania'
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
            refillData: formData,
            userId: this.props.userId
        };
        this.props.onSubmit(this.props.token, refill);
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
                <h4>Formularz dodawania tankowań</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (token, refill) => dispatch(actions.sendRefill(token, refill))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dodawanie);