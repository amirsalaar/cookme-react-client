import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react';
import FoodItem from './FoodItem';
import Food from '../api/food';

export default class FoodIndexPage extends Component {
  state = {
    foods: [],
  };

  componentDidMount() {
    Food.all().then(foods => {
      this.setState({ foods })
    });
  };

  handleFoodItemClick = (event) => {
    event.preventDefault();
  }
  render() {
    document.body.classList = '';
    const { foods } = this.state;
    const extra = (price) => (
      <>
        <Icon name='dollar' />
        {price}
      </>
    )
    return (
      // <main className='page'>
      <div style={{ padding: 10 }} >
        <Grid>
          {foods.map(food => (
            <Grid.Column mobile={16} tablet={8} computer={4} key={food.id}>
              <FoodItem
                image={food.pictures.length > 0 ? food.pictures[0].url : null}
                header={food.name}
                meta='km away'
                description={food.description}
                extra={extra(food.price)}
                link
                onClick={this.handleFoodItemClick}
                foodId={food.id}
              />
            </Grid.Column>
          ))}
        </Grid>
      </div>
      // </main>
    );
  };
};
