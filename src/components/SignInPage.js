import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Grid, Input, Icon, Button, Segment, Message } from 'semantic-ui-react';
import Session from '../api/session';

export default function SignInPage(props) {
  document.body.className = ('sign-in-page')
  const { onSignIn } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const fD = new FormData(currentTarget);
    const signInParams = {
      email: fD.get('email'),
      password: fD.get('password'),
    };
    Session.create(signInParams)
      .then(res => {
        if (res.id) {
          onSignIn();
          props.history.push('/foods')
        }
      });
  };

  const style = {
    inputSize: 'large',
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: '100%',
      position: 'relative',
      flexWrap: 'wrap'
    }
  }
  return (
    <Grid className='sign-in' stackable centered verticalAlign='middle'>
      <Grid.Column
        stretched
        textAlign='center'
        mobile={16}
        tablet={8}
        computer={7}
        largeScreen={5}
        widescreen={4}
        verticalAlign='middle'
      >
        <Segment raised>
          <Segment secondary >
            <Form onSubmit={handleSubmit}>
              <Form.Field required >
                <Input type='email' name='email' iconPosition='left' placeholder='E-mail Address' size={style.inputSize} >
                  <Icon name='mail' />
                  <input />
                </Input>
              </Form.Field>
              <Form.Field required >
                <Input type='password' name='password' iconPosition='left' placeholder='Password' size={style.inputSize} >
                  <Icon name='lock' />
                  <input />
                </Input>
              </Form.Field>
              <Button color='teal' type='submit' size={style.inputSize} className='fluid' >Login</Button>
            </Form>
          </Segment>
          <Message >
            <NavLink to='/sign-up'>Register</NavLink> / <NavLink to='/sign-up'>Forgot Password?</NavLink>
          </Message>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
