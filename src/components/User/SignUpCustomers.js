import React from 'react'
import { User } from '../../api/user';
import { Icon, Button, Form, Input, } from 'semantic-ui-react';
import styles from '../../assets/styles/SignUpPages.module.css'

export default function SignUpCustomers(props) {
  const { onSignUp } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    formData.append('role',2)
    // const signUpParams = {
    //   first_name: formData.get('first_name'),
    //   last_name: formData.get('last_name'),
    //   email: formData.get('email'),
    //   role: 2,
    //   password: formData.get('password'),
    //   password_confirmation: formData.get('password_confirmation'),
    // };
    User.create(formData).then(res => {
      if (res.id) {
        onSignUp();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Field name='first_name' control={Input} label='First Name' placeholder='First Name' size={styles.inputSize} required />
        <Form.Field name='last_name' control={Input} label='Last Name' placeholder='Last Name' size={styles.inputSize} required />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field required width={7} >
          <label htmlFor="email">Email Address</label>
          <Input type='email' name='email' iconPosition='left' placeholder='Email Address' size={styles.inputSize} >
            <Icon name='at' />
            <input />
          </Input>
        </Form.Field>

        <Form.Field name='phone_number' label='Phone Number' control={Input} width={7} type='tel' placeholder='+18887775555' pattern="\+[1][0-9]{3}[0-9]{3}[0-9]{4}" size={styles.inputSize} required />

        <Form.Field name='password' label='Password' control={Input} width={7} type='password' placeholder='Password' size={styles.inputSize} required />

        <Form.Field name='password_confirmation' label='Password Confirmation' control={Input} width={7} type='password' placeholder='Password Confrimation' size={styles.inputSize} required />
      </Form.Group>
      {/* <div style={{ marginBottom: 10 }}>
        <Label
          as="label"
          basic
          htmlFor="upload"
          style={{
            border: 'none',
            padding: 0
          }}
        >
          <Button
            icon="upload"
            label={{
              basic: true,
              content: 'Upload profile picture'
            }}
            labelPosition="right"
          />
          <input name='user[avatar]' hidden id="upload" type="file" />
        </Label>
      </div> */}
      <Button color='teal' type='submit' size={styles.inputSize} >Sign Up</Button>
    </Form>
  )
}
