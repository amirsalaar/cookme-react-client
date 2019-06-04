import React, { Component } from 'react'
import { Grid, Icon, Container, Dimmer, Loader, Label } from 'semantic-ui-react';
import FoodItem from './FoodItem';
import Food from '../api/food';
import getDistance from '../modules/getDistance';
import Footer from './Footer';
// import { getDistance, convertDistance } from 'geolib';

const styles = {
  price: { color: 'teal' }
}

export default class FoodIndexPage extends Component {
  constructor(props) {
    super(props);
    const { currentLocation } = this.props;
    this.state = {
      foods: [],
      currentLocation: currentLocation,
      loading: true,
    };
  };

  componentDidMount() {
    this.fetchFoods();
  };

  fetchFoods = () => {
    Food.all().then(foods => {
      this.setState({
        foods, loading: false
      })
    })
      .catch(err => this.setState({ loading: false }));
  };

  calculateDistance = (lat, lng) => {
    let distance = 0;
    // distance = getDistance(this.state.currentLocation, {
    //   latitude: lat,
    //   longitude: lng
    // });
    // distance = (convertDistance(distance, 'km')).toFixed(2);
    const { currentLocation } = this.state;
    if (currentLocation) {
      distance = getDistance(currentLocation.latitude, currentLocation.longitude, lat, lng)
      return distance
    };
    return 'Your location is not available!'
  };

  handleFoodItemClick = (event) => {
    event.preventDefault();
  };

  render() {
    document.body.classList = '';
    const { foods, loading } = this.state;
    const extra = (price, sale_price) => (
      <>
        <div style={styles.price}>
          {parseFloat(sale_price) !== 0 ? (
            <>
              <span className='cross'>
                <Icon name='dollar' />{price}
              </span>
              <span>
                <Icon name='dollar' />
                {sale_price}
              </span>
            </>
          ) : (
              <>
                <Icon name='dollar' />{price}
              </>
            )}
        </div>
      </>
    );

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
        <div style={{ padding: '2em' }} >
          <Container className='food-index'>
            <Grid
              // columns={3}
              stackable
              centered
            >
              {foods.map(food => (
                <Grid.Column
                  key={food.id}
                  mobile={16}
                  tablet={5}
                  computer={4}
                >
                  <FoodItem
                    image={food.pictures.length > 0 ? food.pictures[0].url : null}
                    header={food.name}
                    meta={
                      <>
                        <Icon name='point' size='small' />
                        {this.calculateDistance(food.cook.latitude, food.cook.longitude)}
                      </>
                    }
                    description={food.description}
                    extra={
                      <div style={{ display: 'flex', }}>
                        <span>{extra(food.price, food.sale_price)}</span>
                        {food.sale_price && parseFloat(food.sale_price) !== 0 ? (
                          <span
                            style={{ marginLeft: 'auto' }}
                          >
                            <Label
                              color='red' corner='right' icon='percent'
                            >
                            </Label>
                          </span>

                        ) : null}
                      </div>
                    }
                    link
                    onClick={this.handleFoodItemClick}
                    foodId={food.id}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Container>
        </div>
        <Footer isInverted={true} />
      </>
    );
  };
};
