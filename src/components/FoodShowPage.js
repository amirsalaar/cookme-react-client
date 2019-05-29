import React, { Component } from 'react';
import { Grid, Image, Container, Card, Icon, Dimmer, Loader, Button, Input } from 'semantic-ui-react';
import CheckoutSidebar from './CheckoutSidebar';
import Food from '../api/food';
import Session from '../api/session';
import { User } from '../api/user';

const classes = {
  foodImageGrid: { padding: 50, },
  container: { width: '85%', },
  descriptionCard: { minHeight: 200, },
  imageCard: { minHeight: 200, },
  shoppingButtunRow: { paddingTop: 0 },
  shoppingCard: { border: 'none', boxShadow: 'none' },
  quantityInput: { width: 50, margin: 'auto', textAlign: 'center' },
  quantityRow: { paddingBottom: 10 },
  sidebarContainer: { paddingRight: 0, paddingLeft: 0 },

};

export default class FoodShowPage extends Component {
  state = {
    food: null,
    loading: true,
    quantity: 1,
    cartDetails: [],
  };

  componentDidMount = () => {
    this.fetchFood();
    this.setState({cartDetails: this.props.cartDetails})
  };

  fetchFood = () => {
    const id = this.props.match.params.id;
    Food.one(id)
      .then(food => this.setState({ food, loading: false }))
      .catch(err => this.setState({ loading: false }));
  };

  handleQuantity = (value) => {
    if (value === 'decrement') {
      return this.setState({ quantity: this.state.quantity === 0 ? 0 : this.state.quantity - 1 });
    };
    return this.setState({ quantity: this.state.quantity + 1 });
  };

  handleAddToCart = () => {
    if (this.state.quantity === 0) {
      this.setState({ quantity: 1 });
    };
    const order = {
      foodId: this.state.food.id,
      quantity: this.state.quantity,
    };
    const cartDetail = {
      food: this.state.food,
      quantity: this.state.quantity
    };
    Session.addToCart(order)
      .then((res) => {
        this.props.onAddToCart(order);
        this.setState({ cartDetails: [...this.state.cartDetails, cartDetail] })
      });
  };

  render() {
    const { food, loading } = this.state;
    if (loading) {
      return (
        <Grid>
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        </Grid>
      )
    };

    return (
      <Container style={classes.container} >
        <Grid stackable centered >

          <Grid.Column computer={13} tablet={12} >
            <Grid stackable>
              <Grid.Row >

                <Grid.Column width={8} >
                  <Card fluid  >
                    <Image src={food.pictures.length > 0 ? food.pictures[0].url : null} />
                  </Card>
                </Grid.Column>

                <Grid.Column width={8} >
                  <Card fluid>
                    <Card.Content header={food.name} />
                    <Card.Content description={food.description} style={classes.descriptionCard} />
                    <Card.Content>
                      <Grid columns='equal' centered stackable>

                        <Grid.Row style={classes.quantityRow}>
                          <Grid.Column largeScreen={6} computer={8} mobile={16} tablet={16} style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button.Group fluid icon basic size='large'>
                              <Button onClick={() => this.handleQuantity('decrement')}>
                                <Icon name='minus' />
                              </Button>
                              <Button>
                                <Input type='text' value={this.state.quantity} transparent size='small' style={classes.quantityInput}>
                                  <input style={{ textAlign: 'center' }} />
                                </Input>
                              </Button>
                              <Button onClick={(add = 'increment') => this.handleQuantity(add)}>
                                <Icon name='add' />
                              </Button>
                            </Button.Group>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row style={classes.shoppingButtunRow}>
                          <Grid.Column largeScreen={6} computer={8} mobile={16} tablet={16} style={{ margin: 'auto' }}>
                            <Button fluid positive animated='vertical' style={classes.shoppingButtun} size='large' onClick={this.handleAddToCart}>
                              <Button.Content hidden>Add to Cart</Button.Content>
                              <Button.Content visible>
                                <Icon name='add to cart' size='large' />
                              </Button.Content>
                            </Button>
                          </Grid.Column>
                        </Grid.Row>

                      </Grid>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='dollar' />
                      {food.price}
                    </Card.Content>
                  </Card>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column computer={3} tablet={4} style={classes.sidebarContainer}>
            <Grid.Row>
              <CheckoutSidebar cartItems={this.props.cartDetails} />
            </Grid.Row>
          </Grid.Column>

          <Grid.Row>
            <Grid.Column width={4} style={classes.foodImageGrid}>
              Cook
              </Grid.Column>
            <Grid.Column width={4} style={classes.foodImageGrid}>
              kitchen location, kitchen map
              </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    )
  }
}
