import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('orders.json')
            .then(res => {
                const responseData = Object.keys(res.data).reduce((acc,cur) => {
                    acc.push({
                        ...res.data[cur],
                        id: cur
                    })
                    return acc
                },[])
                
                this.setState({
                    loading: false,
                    orders: responseData
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                  loading: false,
                });
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => {
                        return <Order key={order.id} price={order.price} ingredients={order.ingredients}/>;
                    })
                }
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);