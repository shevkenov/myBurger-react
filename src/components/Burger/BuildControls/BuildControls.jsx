import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const BuildControls = props => {
  let ingedients = Object.keys(props.ingredients).map(ing => {
    const label = ing[0].toUpperCase() + ing.slice(1);
    return (
      <BuildControl
        key={ing}
        increase={() => props.addIngredient(ing)}
        decrease={() => props.removeIngredient(ing)}
        label={label}
        disabled={props.disabledIng[ing]}
      />
    );
  });

  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {ingedients}
      <button onClick={props.makeOrder} disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
  );
};

export default BuildControls;
