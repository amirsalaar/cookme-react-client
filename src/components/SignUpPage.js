import React from 'react';
import { Label, Menu, Tab, Grid, Container } from 'semantic-ui-react';
import { User } from '../api/user';
import SignUpCooks from './SignUpCooks';
import SignUpCustomers from './SignUpCustomers';

export default function SignUpPage(props) {
  const panes = [
    {
      menuItem: { key: 'cook', icon: 'user secret', content: 'As a cook' },
      render: () => <Tab.Pane>
        <SignUpCooks />
      </Tab.Pane>,
    },
    {
      menuItem: { key: 'customer', icon: 'user', content: 'As a customer' },
      render: () => <Tab.Pane>
        <SignUpCustomers />
      </Tab.Pane>,
    },
  ]
  const style = {
    wrapper: {
      margin: 'auto',
      width: '80%'
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
