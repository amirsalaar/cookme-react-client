import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import CheckoutSidebar from './CheckoutSidebar';
import PaymentForm from './PaymentForm';


const classes = {
  container: {width: '75%'},
  sidebarContainer: { paddingRight: 0, paddingLeft: 0 },
}

export default class CheckoutShowPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
  };

  render() {
    document.body.classList = '';

    return (
      <Container style={classes.container}>
        <Grid celled stackable>
          <Grid.Column mobile={16} tablet={9} computer={11}  largeScreen={10} >
            <PaymentForm />
          </Grid.Column>

          <Grid.Column mobile={16} tablet={7} computer={5} largeScreen={4} style={classes.sidebarContainer} >
            <CheckoutSidebar hidden cartItems={this.props.cartItems} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
