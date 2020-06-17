import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                    ingredients={this.props.ing} 
                    canceledPurchasing={this.canceledPurchasingHandler}
                    continuedPurchasing={this.contionuedPurchasingHandler}
                    />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);