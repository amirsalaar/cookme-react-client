import React from 'react'
import { Grid, Image, Container, Rail, Ref, Sticky, Segment, Placeholder, Checkbox, Header } from 'semantic-ui-react';

const classes = {
  foodImageGrid: {
    padding: 50,
  },
  container: {
    width: '95%'
  }
}
export default function FoodShowPage(props) {
  return (
    <Container style={classes.container} >
      <Grid stackable celled >

        <Grid.Column width={14}>
          <Grid celled stackable>
            <Grid.Row >
              <Grid.Column width={9} style={classes.foodImageGrid} >
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </Grid.Column>
              <Grid.Column width={7} >
                <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
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
