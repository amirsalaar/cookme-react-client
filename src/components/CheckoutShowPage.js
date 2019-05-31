import React, { Component } from 'react';
import { Grid, Container, Segment, List, Icon, ListContent, Button, Header, Table, ListItem } from 'semantic-ui-react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Step } from 'semantic-ui-react';
import { Order } from '../api/order';
import Receipt from './Receipt';

const styles = {
  itemsContainer: { width: '60%', marginBottom: '2em', marginTop: '2em' },
  sidebarContainer: { paddingRight: 10, paddingLeft: 10 },
  itemName: { display: 'flex' },
  totalList: { fontSize: '0.8 em', fontWeight: 'bold' },
  checkoutForm: { width: '40%' }
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
    // isPaid: false,
    stage: 'Confirmation',
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
  };

  componentDidMount = async () => {
    await this.setState({
      cartDetails: this.props.cartDetails,
      stage: 'Confirmation',
      currentUser: this.props.currentUser,
    }, () => this.calculateTotalPrice());
  };

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.cartDetails !== this.props.cartDetails) {
      await this.setState({ cartDetails: nextProps.cartDetails });
    };
    await this.calculateTotalPrice();
    await this.setState({ user: this.props.crrentUser })
    if (nextProps.currentUser) { await this.setState({ currentUser: this.props.currentUser }) };
  };

  showReceipt = () => {
    this.setState({ stage: 'Receipt' })
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
    let total = (parseFloat(this.state.subTotal) + parseFloat(this.state.tax)).toFixed(2);
    const receiptDetails = {
      subTotal: this.state.subTotal,
      tax: this.state.tax,
      total,
      orderID
    };
    return (
      <Container mobile={16} tablet={10} computer={9}>
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
                  description='Download your receipt'
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

              <Segment attached piled >
                {stage === 'Confirmation' ?
                  (
                    <Container style={styles.itemsContainer} >
                      <Grid centered>
                        <Grid.Row>
                          <Grid.Column textAlign='center'>
                            <Header>Cart Items</Header>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Table stackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Food Item</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                              <Icon name='dollar' />Price
                              </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        
                        <Table.Body>
                          {cartDetails.map((cartItem, index) => {
                            return (
                              <Table.Row key={index}>
                                <Table.Cell>
                                  {cartItem.quantity}
                                </Table.Cell>
                                <Table.Cell>
                                  {cartItem.food.name}
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                  {cartItem.food.price * cartItem.quantity}
                                </Table.Cell>
                              </Table.Row>
                            )
                          })}
                        </Table.Body>

                        <Table.Footer>
                          <Table.Row>
                            <Table.HeaderCell>
                              <List style={styles.totalList}>
                                <List.Item>
                                  <List.Content content='Subtotal' floated='left' />
                                </List.Item>
                                <List.Item>
                                  <List.Content content='Tax' floated='left' />
                                </List.Item>
                                <List.Item>
                                  <List.Content content='Total' floated='left' />
                                </List.Item>
                              </List>
                            </Table.HeaderCell>

                            <Table.HeaderCell />

                            <Table.HeaderCell >
                              <List style={styles.totalList}>
                                <List.Item>
                                  <List.Content floated='right'>
                                    {this.state.subTotal}
                                  </List.Content>
                                </List.Item>
                                <List.Item>
                                  <List.Content floated='right'>
                                    {this.state.tax}
                                  </List.Content>
                                </List.Item>
                                <List.Item>
                                  <List.Content floated='right'>
                                    {total}
                                  </List.Content>
                                </List.Item>
                              </List>
                            </Table.HeaderCell>

                          </Table.Row>
                        </Table.Footer>
                      </Table>

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
                  ) : (stage === 'Billing' ? (
                    <Grid centered>
                      <Grid.Column mobile={16} tablet={9} computer={7} largeScreen={6}>
                        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
                          <div className="example">
                            <Elements>
                              <CheckoutForm
                                orderID={orderID}
                                currentUser={currentUser}
                                onPay={this.showReceipt}
                              />
                            </Elements>
                          </div>
                        </StripeProvider>
                      </Grid.Column>
                    </Grid>
                  ) : (
                      <Receipt
                        cartDetails={this.props.cartDetails}
                        receiptDetails={receiptDetails}
                      />
                    )
                  )}
              </Segment>

            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container >
    )
  }
}
