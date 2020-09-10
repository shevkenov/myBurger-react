import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  canceledPurchasingHandler = () => {
    this.props.history.goBack();
  };

  contionuedPurchasingHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ing) {
        summary = (
          <div>
            {purchasedRedirect}
            <CheckoutSummary
              ingredients={this.props.ing}
              canceledPurchasing={this.canceledPurchasingHandler}
              continuedPurchasing={this.contionuedPurchasingHandler}
            />
            <Route
              path={this.props.match.path + "/contact-data"}
              component={ContactData}
            />
          </div>
        );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);