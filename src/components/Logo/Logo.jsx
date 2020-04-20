import React from 'react'

import ImageSource from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={ImageSource} alt='MyBurger'/>
        </div>
    )
}

export default Logo