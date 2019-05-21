import React from 'react'
import { User } from '../api/user';

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
        <div>
          <label htmlFor="first_name"> First Name </label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name"> Last Name </label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="email"> Email </label>
          <input type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="certificate"> Cooking Certificate </label>
          <input type="file" name="certificate" id="certificate" />
        </div>
        <div>
          <label htmlFor="address"> Kitchen Address </label>
          <input type="text" name="address" id="address" />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input type="text" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="password_confirmation"> Password Confirmation </label>
          <input type="text" name="password_confirmation" id="password_confirmation" />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}
