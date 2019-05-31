import React, { Component } from 'react';
import { Grid, Container, Card, Segment, List, Icon, ListContent, Button } from 'semantic-ui-react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Step } from 'semantic-ui-react';
import { Order } from '../api/order';

const styles = {
  itemsContainer: { width: '75%' },
  sidebarContainer: { paddingRight: 10, paddingLeft: 10 },
  itemName: { display: 'flex' },
  totalList: { fontSize: '0.8 em', fontWeight: 'bold' },
  checkoutForm: { width: '40%' }
  // shoppingButtun: {alignItem: 'center'}
};

export default class CheckoutShowPage extends Component {
  state = {
    cartDetails: this.props.cartDetails,
    subTotal: 0,
    tax: 0,
    stripe: null,
    active: 'Confirmation',
    disabled: true,
    currentUser: null,
    isConfirmed: false,
    stage: null,
    orderID: null
  };

  handleClick = (e, { title }) => this.setState({ active: title })

  calculateTotalPrice = () => {
    let subTotal = 0;
    if (this.state.cartDetails.length > 0) {
      this.state.cartDetails.forEach(cartItem => {
        subTotal += cartItem.food.price * cartItem.quantity;
      });
      return this.setState({ subTotal: subTotal.toFixed(2), tax: (subTotal * 0.12).toFixed(2) })
    };
    return this.state
  };

  handleProceedOrder = () => {
    Order.create(this.state.currentUser.id)
      .then(order => this.setState({ isConfirmed: true, stage: 'Billing', orderID: order.id }));
  }

  componentDidMount = async () => {
    await this.setState({ cartDetails: this.props.cartDetails, stage: 'Confirmation' }, () => this.calculateTotalPrice());
  };

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.cartDetails !== this.props.cartDetails) {
      await this.setState({ cartDetails: nextProps.cartDetails });
    };
    await this.calculateTotalPrice();
    await this.setState({ user: this.props.crrentUser })
    if (nextProps.currentUser) { await this.setState({ currentUser: this.props.currentUser }) };
  };

  render() {
    document.body.classList = '';
    const {
      cartDetails,
      active,
      isConfirmed,
      stage,
      orderID,
      currentUser
    } = this.state;

    return (
      <Container mobile={16} tablet={10} computer={9}>
        {/* <Segment stacked raised size='tiny'> */}
        <Grid stackable centered >

          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={15} computer={13}>

              <Step.Group size='tiny' attached>
                <Step
                  // active={active === 'Confirmation'}
                  disabled={stage === 'Confirmation' ? false : true}
                  icon='info'
                  link
                  onClick={this.handleClick}
                  title='Confirm Order'
                  description='Choose your shipping options'
                />
                <Step
                  // active={active === 'Billing'}
                  disabled={stage === 'Billing' ? false : true}
                  icon='credit card'
                  link
                  onClick={this.handleClick}
                  title='Billing'
                  description='Enter billing information'
                />
                <Step
                  // active={active === 'Billing'}
                  disabled={stage === 'Receipt' ? false : true}
                  icon='file alternate outline'
                  link
                  onClick={this.handleClick}
                  title='Receipt'
                  description='Enter billing information'
                />
              </Step.Group>

              <Segment attached stacked >
                {!isConfirmed ?
                  (
                    <Container style={styles.itemsContainer} >
                      <List>
                        {cartDetails.map((cartItem, index) => {
                          return (
                            <List.Item key={index} >
                              <ListContent floated='left'>&bull;</ListContent>
                              <List.Content floated='left'>
                                {/* <span><Icon name='minus' size='tiny' /></span> */}
                                <span style={styles.listQuantity}>{cartItem.quantity}</span>
                                {/* <span><Icon name='plus' size='tiny' /></span> */}
                              </List.Content>
                              <List.Content style={styles.itemName}>
                                {cartItem.food.name}
                                <span style={{ marginLeft: 'auto', padding: 0 }}><Icon name='dollar' size='small' />{cartItem.food.price * cartItem.quantity}
                                </span>
                              </List.Content>
                            </List.Item>
                          )
                        })}
                      </List>

                      <hr />

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
                          <List.Content floated='right'><Icon name='dollar' size='small' />
                            {(parseFloat(this.state.subTotal) + parseFloat(this.state.tax)).toFixed(2)}
                          </List.Content>
                        </List.Item>
                      </List>
                      <Grid>
                        <Grid.Column textAlign="center">
                          <Button positive animated='vertical' size='large' onClick={this.handleProceedOrder}>
                            <Button.Content hidden>
                              <Icon name='arrow right' />
                            </Button.Content>
                            <Button.Content visible>
                              Proceed
                          </Button.Content>
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Container>
                  ) : (
                    <Grid centered>
                      <Grid.Column mobile={16} tablet={9} computer={7} largeScreen={6}>
                        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
                          <div className="example">
                            <Elements>
                              <CheckoutForm
                                orderID={orderID}
                                currentUser={currentUser}
                              />
                            </Elements>
                          </div>
                        </StripeProvider>
                      </Grid.Column>
                    </Grid>
                  )}
              </Segment>

            </Grid.Column>
          </Grid.Row>

        </Grid>
        {/* </Segment > */}
      </Container >
    )
  }
}
