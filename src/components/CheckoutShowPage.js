import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import CheckoutSidebar from './CheckoutSidebar';

export default class CheckoutShowPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
  };

  render() {
    document.body.classList = '';
    const classes = {
      container: {
        width: '50%'
      }
    }

    return (
      <Container style={classes.container}>
        <Grid celled stackable>
          <Grid.Column width={12}>
          </Grid.Column>
          <Grid.Column width={4}>
            <CheckoutSidebar hidden cartItems={this.props.cartItems} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
