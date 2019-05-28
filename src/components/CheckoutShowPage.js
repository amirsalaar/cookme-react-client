import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';

export default class CheckoutShowPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.setState({ cartItems: this.props.Details })
  };

  render() {
    return (
      <Container>
        <Grid celled>
          <Grid.Column>
          
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
