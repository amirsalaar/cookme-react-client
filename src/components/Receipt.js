import React from 'react'
import { Container, List, ListContent, Icon, Grid, Button, Header, Message } from 'semantic-ui-react';
import Moment from 'react-moment';

const styles = {
  itemsContainer: { width: '60%', marginBottom: '2em', marginTop: '2em'},
  itemName: { display: 'flex' },
  totalList: { fontSize: '1 em', fontWeight: 'bold' },
  orderDetails: { fontSize: '1.1 em' },
  iconConfirm: {margin: 'auto'},
  itemsList: {fontSize: '1.1em'},
};

export default function Receipt(props) {
  const {
    cartDetails,
    receiptDetails,
    orderID
  } = props;
  return (
    <Container style={styles.itemsContainer} >
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Message positive>
              <div style={styles.iconConfirm}>
                <Icon size='huge' name='check circle' color='green' />
              </div>
              <p>
                Thanks for your purchase!
              </p>
              <Message.Header>Your receipt has been emailed and messaged to you!</Message.Header>
            </Message>
            <Header as='h2'>Order Receipt</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div style={styles.orderDetails}>
              <div>Order Number: #{orderID}</div>
              <div>
                Order Date: <Moment format={'MMM Do YYYY'} />
              </div>
            </div>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      <List style={styles.itemsList}>
        {cartDetails.map((cartItem, index) => {
          return (
            <List.Item key={index} >
              <ListContent floated='left'>&bull;</ListContent>
              <List.Content floated='left'>
                {/* <span><Icon name='minus' size='tiny' /></span> */}
                <span style={styles.listQuantity}>{cartItem.quantity}</span>
                {/* <span><Icon name='plus' size='tiny' /></span> */}
              </List.Content>
              <List.Content style={styles.itemName}>
                {cartItem.food.name}
                <span style={{ marginLeft: 'auto', padding: 0 }}><Icon name='dollar' size='small' />{cartItem.food.price * cartItem.quantity}
                </span>
              </List.Content>
            </List.Item>
          )
        })}
      </List>

      <hr />

      <List style={styles.totalList}>
        <List.Item>
          <List.Content content='Subtotal' floated='left' />
          <List.Content floated='right'><Icon name='dollar' size='small' />{receiptDetails.subTotal}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content content='Tax' floated='left' />
          <List.Content floated='right'><Icon name='dollar' size='small' />{receiptDetails.tax}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='left'>
            Total <small>(Inc. Tax)</small>
          </List.Content>
          <List.Content floated='right'><Icon name='dollar' size='small' />
            {receiptDetails.total}
          </List.Content>
        </List.Item>
      </List>
    </Container>
  )
}

