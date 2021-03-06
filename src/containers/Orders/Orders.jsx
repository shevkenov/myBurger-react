import React, { Component } from 'react'

import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner'; 

class Orders extends Component {
    componentDidMount(){
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />
        console.log(this.props.orders);
        if(!this.props.loading){
            orders = <div>
                {
                    this.props.orders.map(order => {
                        return <Order key={order.id} price={order.price} ingredients={order.ingredients}/>;
                    })
                }
            </div>
        }
        return (
            orders
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));