import React from 'react'

import Aux from "../../hoc/Auxiliary";
import Button from "../../components/UI/Button/Button";

const OrderSummary = (props) => {

    const arrayOfIngredients = Object.keys(props.ingredients)
        .map(ing => {
            return (
              <li key={ing}>
                <span>{ing[0].toUpperCase() + ing.slice(1)}</span>:{" "}
                {props.ingredients[ing]}
              </li>
            );
        })

    return (
      <Aux>
        <h3>Your Order!</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{arrayOfIngredients}</ul>
        <p>Continue to Checkout?</p>
        <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
        <Button type="Danger" clicked={props.cancelPurchasing}>
          Cancel
        </Button>
        <Button type="Success" clicked={props.cantinuePurchasing}>
          Continue
        </Button>
      </Aux>
    );
}

export default OrderSummary