import React, { Component } from 'react';

import Aux from './Auxiliary';
import Modal from '../components/UI/modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        constructor(props){
            super(props)

            this.state = {
                error: null
            }

            this.resInterceptor = axios.interceptors.response.use(
              response => response,
              error => {
                this.setState({ error: error.message });
              }
            );

            this.reqInterseptor = axios.interceptors.request.use(
              request => request,
              error => {
                this.setState({ error: null });
              }
            );
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterseptor);
        }
        

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
              <Aux>
                <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                  {this.state.error}
                </Modal>
                <WrappedComponent {...this.props} />
              </Aux>
            );
        }
    }
}

export default withErrorHandler;