import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as orderActions from '../../../store/actions/index';
import withErrorHandling from '../../../hoc/withErrorHandler';

class ContactData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Full Name",
          },
          value: "",
          validation: {
            required: true,
          },
          isValid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your E-Mail",
          },
          value: "",
          validation: {
            required: true,
          },
          isValid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          validation: {
            required: true,
          },
          isValid: false,
          touched: false,
        },
        city: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "City",
          },
          value: "",
          validation: {
            required: true,
          },
          isValid: false,
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "ZIP code",
          },
          value: "",
          validation: {
            required: true,
            maxLength: 5,
            minLength: 5,
          },
          isValid: false,
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          value: "",
          validation: {
            required: true,
          },
          isValid: false,
          touched: false,
        },
        ordertType: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheepest", displayValue: "Cheepest" },
            ],
          },
          value: 'fastest',
          validation: {},
          isValid: true
        },
      },
    };
  }

  checkValidity = (value, rule) => {
    let isValid = true;
    
    if(rule.required && isValid){
      isValid = value.trim() !== "";
    }
    if(rule.maxLength && isValid){
      isValid = value.trim().length <= 5
    }
    if(rule.minLength && isValid){
      isValid = value.trim().length >= 5
    }

    return isValid;
  }

  inputChangeHandler = (e, elementName) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[elementName]};
    updatedFormElement.value = e.target.value;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elementName] = updatedFormElement;

    const isFormValid = Object.values(updatedOrderForm).reduce((acc, cur) => {
      return (acc = acc && cur.isValid);
    }, true)

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid
    })
    
  };

  orderHandler = (e) => {
    e.preventDefault();

    const orderData = Object.keys(this.state.orderForm).reduce((acc, cur) => {
      acc[cur] = this.state.orderForm[cur].value
      return acc;
    }, {})

    const order = {
      ingredients: {...this.props.ing},
      price: this.props.price,
      orderData
    };

    this.props.onOrderBurger(order);
  };

  render() {
    const form = Object.keys(this.state.orderForm).map(name => {
      const inp = this.state.orderForm[name];
      return (
        <Input
          key={name}
          inputtype={inp.elementType}
          elementConfig={inp.elementConfig}
          value={inp.value}
          changed={(event) => this.inputChangeHandler(event, name)}
          shouldValidate={inp.validation}
          touched={inp.touched}
          isValid={!inp.isValid}
        />
      );
    })

    const contactData = !this.props.loading ? (
      <form onSubmit={this.orderHandler}>
        {form.map(input => input)}
        <Button type="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    ) : (
      <Spinner />
    );

    return (
      <div className={classes.ContactData}>
        <h3>Enter you contact data!</h3>
        {contactData}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => {
      dispatch(orderActions.purchaseBurger(orderData));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(ContactData,axios));
