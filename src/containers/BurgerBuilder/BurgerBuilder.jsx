import React, { Component } from "react";
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionType from '../../store/action';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchasing: false,
      loading: false,
      error: false
    };
  }

  // componentDidMount(){
  //   axios.get("ingredients.json")
  //     .then(response => this.setState({ingredients: response.data}))
  //     .catch(() => this.setState({error: true}))
  // }

  cancelPurchasing = () => {
    this.setState({
      purchasing: false
    })
  }

  changePurchasingStatus = () => {
    this.setState({
      purchasing: true
    })
  };

  changePurchasableStatus = (ingredients) => {
    const sum = Object.values(ingredients).reduce((s,cur) => {
        return s + cur;
    }, 0);

    return sum > 0
  }

  cantinuePurchasing = () => {
    this.props.history.push("/checkout");
  }

  render() {
    let burger = this.state.error ? 'Ops, something went wrong!' : <Spinner />
    let orderSummary = null;
    if(this.props.ing){
      const disabledIng = Object.entries(this.props.ing).reduce(
        (obj, cur) => {
          obj[cur[0]] = cur[1] === 0;
          return obj;
        },
        {}
      );

      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            disabledIng={disabledIng}
            ingredients={this.props.ing}
            addIngredient={this.props.onAddedIngredient}
            removeIngredient={this.props.onRemovedIngredient}
            totalPrice={this.props.totalPrice}
            purchasable={this.changePurchasableStatus(this.props.ing)}
            makeOrder={this.changePurchasingStatus}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          cancelPurchasing={this.cancelPurchasing}
          cantinuePurchasing={this.cantinuePurchasing}
          price={this.props.totalPrice}
        />
      );
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} closeModal={this.cancelPurchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ing: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAddedIngredient: (name) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: name}),
    onRemovedIngredient: (name) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: name})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));