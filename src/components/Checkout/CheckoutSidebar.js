import React, { Component } from 'react';
import { Card, Button, Icon, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import isOnSale from '../../helpers/isOnSale';

const styles = {
  sidebarCardHeader: { fontSize: '1.5em', marginBottom: '1em' },
  listQuantity: { marginRight: 5, marginLeft: 3, fontWeight: 'bold' },
  itemList: { fontSize: '1em' },
  itemName: { display: 'flex', fontSize: '1em', },
  totalList: { fontSize: '1em' },
};

class CheckoutSidebar extends Component {
  state = {
    orders: [],
    subTotal: 0,
    tax: 0,
  };

  calculateTotalPrice = () => {
    let subTotal = 0;
    if (this.state.orders.length > 0) {
      this.state.orders.forEach(cartItem => {
        let price = isOnSale(cartItem.food.price, cartItem.food.sale_price)
        subTotal += price * cartItem.quantity;
      });
      return this.setState({ subTotal: subTotal.toFixed(2), tax: (subTotal * 0.12).toFixed(2) })
    };
    return this.state
  };

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.cartItems !== this.props.cartItems) {
      await this.setState({ orders: nextProps.cartItems })
    };
    await this.calculateTotalPrice();
  };

  componentDidMount = () => {
    this.setState({ orders: this.props.cartItems }, () => this.calculateTotalPrice());
    ;
  };

  redirectToCheckout = () => {
    const { history } = this.props;
    if (history) this.props.history.push('/checkout');
  };

  render() {
    const { orders: cartItems } = this.state;
    return (
      <Card centered fluid>
        <Card.Content>
          <Card.Header style={styles.sidebarCardHeader}>Your order</Card.Header>
          <Card.Description>
            <List>
              {cartItems.map((cartItem, index) => {
                return (
                  <List.Item
                    key={index}
                    style={styles.itemList}
                  >
                    <List.Content floated='left'>
                      {/* <span><Icon name='minus' size='tiny' /></span> */}
                      <span style={styles.listQuantity}>{cartItem.quantity}</span>
                      {/* <span><Icon name='plus' size='tiny' /></span> */}
                    </List.Content>
                    <List.Content style={styles.itemName}>
                      {cartItem.food.name}
                      <span style={{ marginLeft: 'auto', padding: 0 }}>
                        <Icon name='dollar' size='small' />
                        {isOnSale(cartItem.food.price, cartItem.food.sale_price) * cartItem.quantity}
                      </span>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Card.Description>
        </Card.Content>

        <Card.Content >
          <List style={styles.totalList}>
            <List.Item>
              <List.Content content='Subtotal' floated='left' />
              <List.Content floated='right'><Icon name='dollar' size='small' />{this.state.subTotal}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content content='Tax' floated='left' />
              <List.Content floated='right'><Icon name='dollar' size='small' />{this.state.tax}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='left'>
                Total <small>(Inc. Tax)</small>
              </List.Content>
              <List.Content floated='right'><Icon name='dollar' size='small' />{(parseFloat(this.state.subTotal) + parseFloat(this.state.tax)).toFixed(2)}</List.Content>
            </List.Item>
          </List>
        </Card.Content>
        {this.props.hidden ?
          (
            <></>
          )
          :
          (
            <Button
              tablet={16}
              computer={16}
              fluid
              animated='vertical'
              color='teal'
              onClick={this.redirectToCheckout}
              size='large'
            >
              <Button.Content hidden>
                <Icon name='cart' />
              </Button.Content>
              <Button.Content visible>Checkout</Button.Content>
            </Button>
          )}

      </Card >
    )
  }
}

export default withRouter(CheckoutSidebar)
