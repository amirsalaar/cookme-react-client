import React, { Component } from 'react';
import { Grid, Image, Container, Card, Icon, Dimmer, Loader, Button, Input, CardMeta, Segment, Rating } from 'semantic-ui-react';
import CheckoutSidebar from './CheckoutSidebar';
import Food from '../api/food';
import Session from '../api/session';
import MapContainer from './MapContainer';
import { GOOGLE_MAP } from '../config';
import getDistance from '../modules/getDistance';
import RatingsController from './RatingsController';
import FoodIngredients from './FoodIngredients';
import Footer from './Footer';

const styles = {
  container: { width: '85%', marginTop: '2em' },
  foodName: { fontSize: '1.5em' },
  descriptionCard: { minHeight: 200, fontSize: '1.2em', lineHeight: '1.4em' },
  imageCard: { minHeight: 200, },
  shoppingButtonRow: { paddingTop: 0 },
  shoppingCard: { border: 'none', boxShadow: 'none' },
  addToCartIcon: { fontSize: '1.5em' },
  quantityInput: { width: 50, margin: 'auto', textAlign: 'center' },
  quantityRow: { paddingBottom: 10 },
  cardFooter: { color: 'teal', fontSize: '1.2em', display: 'flex' },
  ratingContainer: { marginLeft: 'auto' },
  foodImageGrid: { padding: 50, },
  sidebarContainer: { paddingRight: 0, paddingLeft: 0 },
  mapGrid: { width: '100%', height: '20vh' },
  locationAddress: { padding: '1em 0em', fontSize: '1.1em' },
  ditanceResult: { marginLeft: 'auto' }
};

export default class FoodShowPage extends Component {
  constructor(props) {
    super(props);
    const { currentLocation } = this.props;
    this.state = {
      food: null,
      cook: null,
      loading: true,
      quantity: 1,
      cartDetails: [],
      currentLocation: currentLocation
    };
  };

  componentDidMount = () => {
    this.fetchFood();
    this.setState({ cartDetails: this.props.cartDetails })
  };

  fetchFood = () => {
    const id = this.props.match.params.id;
    Food.one(id)
      .then(food => this.setState({
        food,
        cook: food.cook,
        loading: false
      }))
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

  getAddress = () => {
    const { address } = this.state.cook;
    return address.street_address
      .concat(', ', address.city)
      .concat(', ', address.province)
  };

  calculateDistance = (lat, lng) => {
    let distance = 0;
    const { currentLocation } = this.state;
    if (currentLocation) {
      distance = getDistance(currentLocation.latitude, currentLocation.longitude, lat, lng)
      return distance
    };
    return 'Your location is not available!'
  };

  render() {
    document.body.className = '';
    const { food, loading, cook } = this.state;
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
      <>
        <div className='page food'>
          <Container style={styles.container}  >
            <Grid stackable centered >

              <Grid.Column computer={13} tablet={12} >
                <Grid stackable>
                  <Grid.Row >

                    <Grid.Column width={8} >
                      <Card fluid  >
                        <Image src={food.pictures.length > 0 ? food.pictures[0].url : null} />
                      </Card>

                      <Segment>
                        <Grid stackable>
                          <Grid.Column width={16} style={styles.mapGrid}>
                            <div style={styles.locationAddress}>
                              <CardMeta className='location-pin'>
                                <span>
                                  <Icon name='point' />
                                  {this.getAddress()}
                                </span>
                                <span style={styles.ditanceResult}>
                                  {this.calculateDistance(
                                    cook.latitude, cook.longitude
                                  )}
                                </span>
                              </CardMeta>
                            </div>
                            <MapContainer
                              isMarkerShown
                              googleMapURL={GOOGLE_MAP}
                              loadingElement={<div style={{ height: `100%` }} />}
                              containerElement={<div style={{ height: `100%` }} />}
                              mapElement={<div style={{ height: `100%` }} />}
                              kitchen={{
                                lat: cook.latitude,
                                lng: cook.longitude,
                                cookName: cook.full_name,
                                phone: cook.phone_number
                              }}
                            />
                          </Grid.Column>
                          <Grid.Column width={16} style={styles.foodImageGrid}>

                          </Grid.Column>

                        </Grid>
                      </Segment>

                    </Grid.Column>

                    <Grid.Column width={8} >
                      <Card fluid>
                        <Card.Content
                          header={food.name}
                          style={styles.foodName}
                        />
                        <Card.Content
                          description={food.description}
                          style={styles.descriptionCard}
                        />
                        <Card.Content>
                          <FoodIngredients
                            ingredients={food.ingredients}
                          />
                        </Card.Content>
                        <Card.Content>
                          <Grid columns='equal' centered stackable>

                            <Grid.Row style={styles.quantityRow}>
                              <Grid.Column largeScreen={6} computer={8} mobile={16} tablet={16} style={{ margin: 'auto', textAlign: 'center' }}>
                                <Button.Group fluid icon basic size='large'>
                                  <Button onClick={() => this.handleQuantity('decrement')}>
                                    <Icon name='minus' />
                                  </Button>
                                  <Button>
                                    <Input type='text' value={this.state.quantity} transparent size='small' style={styles.quantityInput}>
                                      <input style={{ textAlign: 'center' }} />
                                    </Input>
                                  </Button>
                                  <Button onClick={(add = 'increment') => this.handleQuantity(add)}>
                                    <Icon name='add' />
                                  </Button>
                                </Button.Group>
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={styles.shoppingButtonRow}>
                              <Grid.Column largeScreen={6} computer={8} mobile={16} tablet={16} style={{ margin: 'auto' }}>
                                <Button
                                  fluid positive
                                  animated='vertical'
                                  size='large'
                                  onClick={this.handleAddToCart}
                                >
                                  <Button.Content hidden>
                                    <Icon name='add to cart' style={styles.addToCartIcon} />
                                  </Button.Content>
                                  <Button.Content visible>
                                    Add to Cart
                                </Button.Content>
                                </Button>
                              </Grid.Column>
                            </Grid.Row>

                          </Grid>
                        </Card.Content>
                        <Card.Content extra style={styles.cardFooter}>
                          <span>
                            <Icon name='dollar' />
                            {food.price}
                          </span>
                          <span style={styles.ratingContainer}>
                            <RatingsController
                              currentRate={food.ratings}
                            />
                          </span>
                        </Card.Content>
                      </Card>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Grid.Column>

              <Grid.Column computer={3} tablet={4} style={styles.sidebarContainer}>
                <Grid.Row>
                  <CheckoutSidebar cartItems={this.props.cartDetails} />
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
        <Footer isInverted={true} />
      </>
    )
  }
}
