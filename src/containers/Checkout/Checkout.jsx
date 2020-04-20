import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props){
        super(props)

        const stateValues = this.props.location.search
          .slice(1)
          .split("&")
          .reduce((acc, cur) => {
            const el = cur.split("=");
            if(el[0] === 'price'){
                acc.totalPrice = el[1];
            }else{
                acc.ingredients = {
                    ...acc.ingredients,
                    [el[0]]: +el[1]
                };
            }

            return acc;
          }, {});

        this.state = {
            ingredients: {...stateValues.ingredients},
            totalPrice: stateValues.totalPrice
        }
    }

    canceledPurchasingHandler = () => {
        this.props.history.goBack()
    }

    contionuedPurchasingHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    canceledPurchasing={this.canceledPurchasingHandler}
                    continuedPurchasing={this.contionuedPurchasingHandler}
                    />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}
                    />
            </div>
        )
    }
}

export default Checkout;