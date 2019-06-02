import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react';

export default class RatingsController extends Component {
  constructor(props) {
    super(props);
    const { currentRate } = this.props;
    this.state = {
      rating: currentRate,
      maxRating: null,
    }
  };

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  render() {
    return (
      <div>
        <Rating
          icon='star'
          size='large'
          maxRating={5}
          onRate={this.handleRate}
          defaultRating={this.state.rating}
        />
      </div>
    )
  }
}

