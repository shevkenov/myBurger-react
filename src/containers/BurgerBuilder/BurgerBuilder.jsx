import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

const prices = {
    salad: 0.5,
    bacon: 0.8,
    meat: 1.3,
    cheese: 0.7
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      purchasable: false,
      totalPrice: 4.00,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount(){
    axios.get("ingredients.json")
      .then(response => this.setState({ingredients: response.data}))
      .catch(() => this.setState({error: true}))
  }

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
    const isPurchasable = sum > 0;


    this.setState({
        purchasable: isPurchasable
    })
  }

  increaseIngrediant = (type) => {
    const updateIngredients = {
        ...this.state.ingredients
    }

    updateIngredients[type] = this.state.ingredients[type] + 1

    const newPrice = this.state.totalPrice + prices[type];

    this.setState(
      {
        ingredients: {
          ...updateIngredients
        },
        totalPrice: newPrice
      },
      this.changePurchasableStatus(updateIngredients)
    );

    
  }
  
  decreaseIngrediant = (type) => {
    const oldValue = this.state.ingredients[type]
    if(oldValue <= 0){
        return;
    }
    const updateIngredients = {
      ...this.state.ingredients
    };

    updateIngredients[type] = oldValue - 1;

    const newPrice = this.state.totalPrice - prices[type];

    this.setState({
      ingredients: {
        ...updateIngredients
      },
      totalPrice: newPrice
    });

    this.changePurchasableStatus(updateIngredients);
  }

  cantinuePurchasing = () => {
    const queryParams = Object.entries(this.state.ingredients).map(
      (ing) => `${encodeURIComponent(ing[0])}=${encodeURIComponent(ing[1])}`
    );

    queryParams.push("price=" + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryParams.join('&')
    });

  }

  render() {
    
    let burger = this.state.error ? 'Ops, something went wrong!' : <Spinner />
    let orderSummary = null;
    if(this.state.ingredients){
      const disabledIng = Object.entries(this.state.ingredients).reduce(
        (obj, cur) => {
          obj[cur[0]] = cur[1] === 0;
          return obj;
        },
        {}
      );

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            disabledIng={disabledIng}
            ingredients={this.state.ingredients}
            addIngredient={this.increaseIngrediant}
            removeIngredient={this.decreaseIngrediant}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            makeOrder={this.changePurchasingStatus}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchasing={this.cancelPurchasing}
          cantinuePurchasing={this.cantinuePurchasing}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
