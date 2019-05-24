import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Grid, Input, Icon, Button, Segment, Message } from 'semantic-ui-react';
import Session from '../api/session';

export default function SignInPage(props) {
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
    page: {
      margin: 'auto',
    },
    wrapper: {
      margin: 'auto',
      width: '50%'
    }
  }
  return (
    <main className='Page' >
      <Grid stackable className='middle aligned center aligned' style={style.page} >
        <Grid.Column style={style.wrapper} >
          <Segment secondary >
            <Form onSubmit={handleSubmit}>
              <Form.Field required >
                <Input type='email' name='email' iconPosition='left' placeholder='E-mail Address'  >
                  <Icon name='user' />
                  <input />
                </Input>
              </Form.Field>
              <Form.Field required >
                <Input type='password' name='password' iconPosition='left' placeholder='Password'  >
                  <Icon name='lock' />
                  <input />
                </Input>
              </Form.Field>
              <Button color='teal' type='submit' size={style.inputSize} className='fluid' >Login</Button>
            </Form>
          </Segment>

          <Message>
            New user? <NavLink to='/sign-up'>Register</NavLink>
          </Message>

        </Grid.Column>
      </Grid>
    </main>
  )
}
