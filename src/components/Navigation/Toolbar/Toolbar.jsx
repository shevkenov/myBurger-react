import React from 'react'

import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.module.css'

const Toolbar = (props) => {
    return (
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggle} />
        <Logo />
        <div className={classes.DesktopOnly}>
          <NavigationItems />
        </div>
      </header>
    );
}

export default Toolbar;