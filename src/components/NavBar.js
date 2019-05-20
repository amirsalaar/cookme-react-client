import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/">
        Home Page
      </NavLink>
      <NavLink to="/foods">
        Foods
      </NavLink>
      <NavLink to="/sign-in">
        Sign In
      </NavLink>
      <NavLink to="/sign-up">
        Sign Up
      </NavLink>
    </nav>
  )
}
