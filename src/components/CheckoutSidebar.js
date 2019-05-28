import React, { Component } from 'react';
import { Card, Button, Icon, List, Image, Grid } from 'semantic-ui-react';
import Food from '../api/food';

export default class CheckoutSidebar extends Component {
  state = {
    order: [],
  };

  calculateTotalPrice = () => {
    // let subTotal = 0;
    // if (this.props.cartItems.length > 0) {
    //   this.props.cartItems.forEach(cartItem => {
    //     subTotal += cartItem.food.price * cartItem.quantity;
    //   });
    //   return this.setState({ subTotal: 0, tax: subTotal * 0.12, total: this.state.subTotal + this.state.tax })
    // };
    // return this.state
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartItems !== this.props.cartItems) {
      this.setState({ order: nextProps.cartItems })
    };
  };

  componentDidMount() {
    this.setState({ order: this.props.cartItems });
  };

  onAddItemToCart = () => {

  }

  render() {
    const classes = {
      sidebarCardHeader: { fontSize: 15 },
      listQuantity: { marginRight: 5, marginLeft: 3, fontWeight: 'bold' },
      itemName: { display: 'flex' },
      totalList: { fontSize: '0.8 em' },
    };

    return (
      <Card centered fluid>
        <Card.Content>
          <Card.Header style={classes.sidebarCardHeader}>Your order</Card.Header>
          <Card.Description>
            <List>
              {this.state.order.map((cartItem, index) => {
                return (
                  <List.Item key={index}>
                    <List.Content floated='left'>
                      <span><Icon name='minus' size='tiny' /></span>
                      <span style={classes.listQuantity}>{cartItem.quantity}</span>
                      <span><Icon name='plus' size='tiny' /></span>
                    </List.Content>
                    <List.Content style={classes.itemName}>
                      {cartItem.food.name}
                      <span style={{ marginLeft: 'auto', padding: 0 }}><Icon name='dollar' size='small' />{cartItem.food.price}
                      </span>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Card.Description>
        </Card.Content>

        <Card.Content >
          <List style={classes.totalList}>
            <List.Item>
              <List.Content content='Subtotal' floated='left' />
              <List.Content floated='right'>$  </List.Content>
            </List.Item>
            <List.Item>
              <List.Content content='Tax' floated='left' />
              <List.Content floated='right'>$</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='left'>
                Total <small>(Inc. Tax)</small>
              </List.Content>
              <List.Content floated='right'>$ </List.Content>
            </List.Item>
          </List>
        </Card.Content>

        <Button tablet={16} computer={16} fluid animated='vertical' color='teal'>
          <Button.Content hidden>
            <Icon name='cart' />
          </Button.Content>
          <Button.Content visible>Checkout</Button.Content>
        </Button>
      </Card >
    )
  }
}
