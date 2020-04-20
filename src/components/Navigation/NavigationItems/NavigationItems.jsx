import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
    return (
      <nav>
        <ul className={classes.NavigationItems}>
          <NavigationItem link="/">
            Burger Builder
          </NavigationItem>
          <NavigationItem link="/checkout">Checkout</NavigationItem>
          <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
      </nav>
    );
}

export default NavigationItems;