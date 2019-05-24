import React from 'react';
import { Label, Menu, Tab, Grid, Container } from 'semantic-ui-react';
import { User } from '../api/user';
import SignUpCooks from './SignUpCooks';
import SignUpCustomers from './SignUpCustomers';

export default function SignUpPage(props) {
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
  const style = {
    wrapper: {
      margin: 'auto',
      width: '60%'
    }
  }

  return (
      <Grid style={style.wrapper}>
        <Grid.Row>
          <Container>
            <Tab panes={panes} />
          </Container>
        </Grid.Row>
      </Grid>
  )
}
