import React from 'react'
import { User } from '../api/user';
import { Icon, Button, Form, Input, Label } from 'semantic-ui-react';
import { SignUpPagesStyles as style } from '../styles/SignUpPagesStyle';

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
      role: 1,
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    };
      User.create(signUpParams).then(res => {
        if (res.id) {
          onSignUp();
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Field name='first_name' control={Input} label='First Name' placeholder='First Name' size={style.inputSize} required />
        <Form.Field name='last_name' control={Input} label='Last Name' placeholder='Last Name' size={style.inputSize} required />
      </Form.Group>

      <label style={style.addressLabel}>Kitchen Address<span style={style.addressStar}>*</span> </label>
      <Form.Group>
        <Form.Input placeholder='Street Address' width={7} size={style.inputSize} required />
        <Form.Input placeholder='City' width={4} size={style.inputSize} required />
        <Form.Input placeholder='Province' width={3} size={style.inputSize} required />
        <Form.Input placeholder='Postal Code' width={2} size={style.inputSize} required />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field required width={7} >
          <label htmlFor="email">Email Address</label>
          <Input type='email' name='email' iconPosition='left' placeholder='Email Address' size={style.inputSize} >
            <Icon name='at' />
            <input />
          </Input>
        </Form.Field>

        <Form.Field name='password' label='Password' control={Input} width={7} type='password' placeholder='Password' size={style.inputSize} required />

        <Form.Field name='password_confirmation' label='Password Confirmation' control={Input} width={7} type='password' placeholder='Password Confrimation' size={style.inputSize} required />
      </Form.Group>

      {/* <label style={style.addressLabel}>Upload your cooking certificate</label>
      <div style={{ marginBottom: 10 }}>
        <Label
          as="label"
          basic
          htmlFor="upload-certificate"
          style={{
            border: 'none',
            padding: 0
          }}
        >
          <Button
            icon="upload"
            label={{
              basic: true,
              content: 'Select certificate'
            }}
            labelPosition="right"
          />
          <input name='user[certificate]' hidden id="upload-certificate" type="file" />
        </Label>
      </div>

      <label style={style.addressLabel}>Upload your profile pircture</label>
      <div style={{ marginBottom: 10 }}>
        <Label
          as="label"
          basic
          htmlFor="upload-avatar"
          style={{
            border: 'none',
            padding: 0
          }}
        >
          <Button
            icon="upload"
            label={{
              basic: true,
              content: 'Select picture'
            }}
            labelPosition="right"
          />
          <input name='user[avatar]' hidden id="upload-avatar" type="file" />
        </Label>
      </div> */}


      <Button color='teal' type='submit' size={style.inputSize} >Sign Up</Button>
    </Form>
  )
}
