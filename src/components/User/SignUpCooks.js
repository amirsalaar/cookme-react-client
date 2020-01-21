import React from 'react'
import { User } from '../../api/user';
import { Icon, Button, Form, Input, Label } from 'semantic-ui-react';
import styles from '../../assets/styles/SignUpPages.module.css'

export default function SignUpCooks(props) {
  const { onSignUp } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    formData.append('role',1)
    // const signUpParams = {
    //   first_name: formData.get('first_name'),
    //   last_name: formData.get('last_name'),
    //   email: formData.get('email'),
    //   role: 1,
    //   password: formData.get('password'),
    //   password_confirmation: formData.get('password_confirmation'),
    //   avatar: formData.get('user[avatar]')
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

      <label className={styles.addressLabel}>Kitchen Address<span className={styles.addressStar}>*</span></label>
      <Form.Group>
        <Form.Input className='address-input' name='address[street_address]' placeholder='Street Address' width={7} size={styles.inputSize} required />
        <Form.Input name='address[city]' placeholder='City' width={4} size={styles.inputSize} required />
        <Form.Input name='address[province]' placeholder='Province' width={3} size={styles.inputSize} required />
        <Form.Input name='address[postal_code]' placeholder='Postal Code' width={2} size={styles.inputSize} required />
        <Form.Field hidden>
          <Form.Input name='address[country]' value='canada' placeholder='Postal Code' width={2} size={styles.inputSize} required />
        </Form.Field>
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field required width={7} >
          <label htmlFor="email">Email Address</label>
          <Input type='email' name='email' iconPosition='left' placeholder='Email Address' size={styles.inputSize} >
            <Icon name='at' />
            <input />
          </Input>
        </Form.Field>

        <Form.Field name='password' label='Password' control={Input} width={7} type='password' placeholder='Password' size={styles.inputSize} required />

        <Form.Field name='password_confirmation' label='Password Confirmation' control={Input} width={7} type='password' placeholder='Password Confrimation' size={styles.inputSize} required />
      </Form.Group>

      <label className={styles.addressLabel}>Upload your cooking certificate</label>
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
          <input name='certificate' hidden id="upload-certificate" type="file" />
        </Label>
      </div>

      {/* <label style={styles.addressLabel}>Upload your profile pircture</label>
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
          <input name='avatar' hidden id="upload-avatar" type="file" />
        </Label>
      </div> */}


      <Button color='teal' type='submit' size={styles.inputSize} >Sign Up</Button>
    </Form>
  )
}
