import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { Form, Grid, Input, Icon, Button, Segment, Message } from 'semantic-ui-react';

export default function SignInPage(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
  }
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
                <Input type='password' name='email' iconPosition='left' placeholder='Password'  >
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
