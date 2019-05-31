import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { BASE_URL } from '../config';
import { Form, Input, Icon, Button, Grid, Label } from 'semantic-ui-react';
import { Order } from '../api/order';

const styles = {
  cardElement: {
    base: {
      fontFamily: 'Lato,"Helvetica Neue",Arial,Helvetica,sans-serif',
      color: 'rgba(0,0,0,.87)',
      fontSize: '1em',
    }
  },
  payButton: { marginTop: 15 },
  cardElementWrapper: {
    border: '1px solid rgba(34,36,38,.15)',
    transition: 'color .1s ease,border-color .1s ease',
    padding: '.67857143em .67857143em',
    lineHeight: '1.21428571em',
    borderRadius: '.28571429rem',
    boxShadow: '0 0 0 0 transparent inset',
  },
};

class CheckoutForm extends Component {
  state = {
    orderID: null,
    currentUser: null,
  }

  componentWillReceiveProps = async (nextProps) => {
    const { orderID, currentUser } = nextProps;
    if (orderID) {
      await this.setState({ orderID: this.props.orderID });
    };
  };

  submit = async (ev) => {
    ev.preventDefault();
    const { currentTarget } = ev;
    const fD = new FormData(currentTarget);
    const cardInfo = {
      name: fD.get('name'),
    };
    let { token } = await this.props.stripe.createToken(
      { name: cardInfo.name, }
    );
    console.log(token)
    // let response = await fetch(`${BASE_URL}/orders/${this.state.orderID}/payments`, {
    //   method: "POST",
    //   headers: { "Content-Type": "text/plain" },
    //   body: token.id
    // }); 
    const response = await Order.charge(token, this.state.orderID);
    if (response.ok) console.log("Purchase Complete!")
  };

  render() {
    return (
      <div className="checkout">

        <Form warning onSubmit={this.submit}>
          <Form.Field>
            Credit/Debit Card Information
          </Form.Field>
          <Form.Field required >
            <Input size='tiny' type='text' name='name' iconPosition='left' placeholder="Card Holder's Name" >
              <Icon name='user' />
              <input type='text' name='name' placeholder="Card Holder's Name" />
            </Input>
          </Form.Field>
          <Form.Field style={styles.cardElementWrapper}>
            <CardElement style={styles.cardElement} />
          </Form.Field>

          <Grid centered style={styles.payButton}>
            <Grid.Column textAlign="center" mobile={16} tablet={7} computer={7}>
              <Button compact fluid positive color='teal' type='submit'>Pay</Button>
            </Grid.Column>
          </Grid>
        </Form>

        {/* <button onClick={this.submit}>Pay</button> */}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
