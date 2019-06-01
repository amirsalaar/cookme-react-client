import React, { Component } from 'react'
import { Grid, Icon, Container } from 'semantic-ui-react';
import FoodItem from './FoodItem';
import Food from '../api/food';
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
    };
  };

  componentDidMount() {
    Food.all().then(foods => {
      this.setState({ foods })
    });
  };

  distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km 
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return Math.round(d) + " km away";
    else if (d <= 1) return Math.round(d * 1000) + " m away";
    return d;
  };

  calculateDistance = (lat, lng) => {
    let distance = 0;
    // distance = getDistance(this.state.currentLocation, {
    //   latitude: lat,
    //   longitude: lng
    // });
    // distance = (convertDistance(distance, 'km')).toFixed(2);
    distance = this.distance(this.state.currentLocation.latitude, this.state.currentLocation.longitude, lat, lng)
    return distance
  };

  handleFoodItemClick = (event) => {
    event.preventDefault();
  };

  render() {
    document.body.classList = '';
    const { foods } = this.state;
    const extra = (price) => (
      <>
        <div style={styles.price}>
          <Icon name='dollar' />
          {price}
        </div>
      </>
    );

    return (
      <div style={{ padding: 20 }} >
        <Container className='food-index'>
          <Grid columns={3} doubling stackable className='masonry'>
            {foods.map(food => (
              <Grid.Column key={food.id}>
                <FoodItem
                  image={food.pictures.length > 0 ? food.pictures[0].url : null}
                  header={food.name}
                  meta={this.calculateDistance(food.cook.latitude, food.cook.longitude)}
                  description={food.description}
                  extra={extra(food.price)}
                  link
                  onClick={this.handleFoodItemClick}
                  foodId={food.id}
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      </div>
    );
  };
};
