import React from 'react'

import classes from './Order.module.css';

const Order = (props) => {
    return (
      <div className={classes.Order}>
        <p>
          Ingredients: 
          {Object.keys(props.ingredients).map((ing) => {
            return (
              <span key={ing} style={{
                  textTransform: 'capitalize',
                  display: 'inline-block',
                  margin: '0 8px',
                  border: '1px solid #ccc',
                  padding: '5px'
                }}>
                {ing} ({props.ingredients[ing]})
              </span>
            );
          })}
        </p>
        <p>
          Total Price:{" "}
          <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
      </div>
    );
}

export default Order