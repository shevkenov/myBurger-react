import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';
import classes from '../SideDrawer/SideDrawer.module.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
      attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
      <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <NavigationItems />
        </div>
      </Aux>
    );
}

export default SideDrawer;