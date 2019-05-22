import React from 'react'
import { User } from '../api/user';
import { Icon, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react';

export default function SignUpCooks(props) {
  const { onSignUp } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const signUpParams = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      role: 2,
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    };
    User.create(signUpParams).then(res => {
      if (res.id) {
        onSignUp();
        props.history.push('/')
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field name='first_name' control={Input} label='First Name' placeholder='First Name' required />
            <Form.Field control={Input} label='Last Name' placeholder='Last Name' required />
          </Form.Group>

          <Form.Group>
            <Form.Input placeholder='Street Address' width={7} required />
            <Form.Input placeholder='City' width={4} required />
            <Form.Input control={Select} placeholder='Province' width={3} required />
            <Form.Input placeholder='Postal Code' width={2} required />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field required width={7}>
              <label htmlFor="email">Email Address</label>
              <Input type='email' name='email' iconPosition='left' size='small' placeholder='Email Address'>
                <Icon name='at' />
                <input />
              </Input>
            </Form.Field>
            <Form.Field name='password' label='Password' control={Input} width={7} type='password' placeholder='Password' required />
            <Form.Field name='password_confirmation' label='Password Confirmation' control={Input} width={7} type='password' placeholder='Password Confrimation' required />
          </Form.Group>

        </Form>
        <div>
          <label htmlFor="certificate"> Cooking Certificate </label>
          <input type="file" name="certificate" id="certificate" />
        </div>
        <div>
          <label htmlFor="address"> Kitchen Address </label>
          <input type="text" name="address" id="address" required />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="password_confirmation"> Password Confirmation </label>
          <input type="password" name="password_confirmation" id="password_confirmation" required />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}
