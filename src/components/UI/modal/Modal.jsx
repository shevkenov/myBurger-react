import React, { Component } from 'react';

import Aux from "../../../hoc/Auxiliary";
import Backdrop from '../backdrop/Backdrop';

import classes from './Modal.module.css'

class Modal extends Component {

  componentDidUpdate(){
    console.log('Modal render')
  }

  shouldComponentUpdate(nextProps){
    return (
      this.props.show !== nextProps.show ||
      this.props.children !== nextProps.children
    );
  }

  render(){
    return (
      <Aux>
        <Backdrop clicked={this.props.closeModal} show={this.props.show} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
    
}

export default Modal;