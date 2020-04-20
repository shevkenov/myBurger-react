import React from 'react'

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it teasts well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type='Danger' clicked={props.canceledPurchasing}>CANCEL</Button>
            <Button type='Success' clicked={props.continuedPurchasing}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary