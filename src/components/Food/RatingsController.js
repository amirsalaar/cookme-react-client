import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react';

export default class RatingsController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      maxRating: null,
    }
  };

  componentDidMount = () => {
    this.setState({ rating: this.props.currentRate })
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.currentRate !== prevProps.currentRate) {
      this.setState({ rating: this.props.currentRate })
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentRate !== state.rating) {
      return {
        rating: props.currentRate,
      }
    };
    return null
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

