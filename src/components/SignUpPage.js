import React from 'react';
import { Tab, Grid, Container, Segment } from 'semantic-ui-react';
import SignUpCooks from './SignUpCooks';
import SignUpCustomers from './SignUpCustomers';

const styles = {
  rootGrid: { justifyContent: 'center' }
}

export default function SignUpPage(props) {
  document.body.classList = ('sign-up-page');

  const { onSignUpPage } = props;

  const handleSignUp = () => {
    onSignUpPage();
    props.history.push('/')
  };

  const panes = [
    {
      menuItem: { key: 'cook', icon: 'user secret', content: 'As a cook' },
      render: () => <Tab.Pane>
        <SignUpCooks onSignUp={handleSignUp} />
      </Tab.Pane>,
    },
    {
      menuItem: { key: 'customer', icon: 'user', content: 'As a customer' },
      render: () => <Tab.Pane>
        <SignUpCustomers onSignUp={handleSignUp} />
      </Tab.Pane>,
    },
  ]

  return (
    <Grid
      className='sign-up'
      stackable
      verticalAlign='middle'
      style={styles.rootGrid}
    >
      <Grid.Column
        stretched
        mobile={16}
        tablet={11}
        computer={11}
        largeScreen={7}
        verticalAlign='middle'
      >
        <Container>
          <Segment raised>
            <Tab panes={panes} />
          </Segment>
        </Container>
      </Grid.Column>
    </Grid>
  )
}
