import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id.name,
        orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

const purchaseBurgerStart = () => {
    return {
      type: actionTypes.PURCHASE_BURGER_START,
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData) => {  
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
          .post("orders.json", orderData)
          .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data, orderData));
          })
          .catch((error) => {
            dispatch(purchaseBurgerFail(error));
          });
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders
    }
}

const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: err
    }
}

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("orders.json")
      .then((res) => {
        const responseData = Object.keys(res.data).reduce((acc, cur) => {
          acc.push({
            ...res.data[cur],
            id: cur,
          });
          return acc;
        }, []);
        dispatch(fetchOrderSuccess(responseData));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};