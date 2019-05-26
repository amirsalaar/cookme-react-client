import React, { Component } from 'react';
import { Grid, Image, Container, Card,Icon, Dimmer, Loader } from 'semantic-ui-react';
import Food from '../api/food';

const classes = {
  foodImageGrid: {
    padding: 50,
  },
  container: {
    width: '85%'
  },
  descriptionCard: {
    minHeight: 200
  }
}
export default class FoodShowPage extends Component {
  state = {
    food: null,
    loading: true
  };

  componentDidMount = () => {
    this.fetchFood();
  };

  fetchFood = () => {
    const id = this.props.match.params.id;
    Food.one(id)
      .then(food => this.setState({ food, loading: false }))
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    const { food, loading } = this.state;

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
      <Container style={classes.container} >
        <Grid stackable celled >

          <Grid.Column width={14}>
            <Grid  stackable>
              <Grid.Row >

                <Grid.Column width={8} >
                  <Card fluid >
                  <Image src={food.pictures.length > 0 ? food.pictures[0].url : null} />
                  </Card>
                </Grid.Column>

                <Grid.Column width={8} >
                  <Card fluid>
                    <Card.Content header={food.name} />
                    <Card.Content description={food.description} style={classes.descriptionCard} />
                    <Card.Content extra>
                      <Icon name='user' />
                      4 Friends
                    </Card.Content>
                  </Card>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={2}>
            <Grid.Column width={2} >
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
          </Grid.Column>

          <Grid.Row>
            <Grid.Column width={4} style={classes.foodImageGrid}>
              Cook
              </Grid.Column>
            <Grid.Column width={4} style={classes.foodImageGrid}>
              contact cook
              </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    )
  }
}
