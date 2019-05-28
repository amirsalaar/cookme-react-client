import React, { Component } from 'react';

export default class CheckoutShowPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.setState({ cartItems: this.props.cartItems})
  };

  render() {
    return (
      <div>

      </div>
    )
  }
}
