import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import logo from '../assets/images/logo.jpeg'

export class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <nav>
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item>
              <img src={logo} alt="Logo" />
            </Menu.Item>

            <Menu.Item
              name='home'
              header as={NavLink} exact to="/"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='foods'
              header as={NavLink} exact to="/foods"
              active={activeItem === 'foods'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='Sign In'
                header as={NavLink} exact to="/sign-in"
                active={activeItem === 'Sign In'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Sign Up'
                header as={NavLink} exact to="/sign-up"
                active={activeItem === 'Sign Up'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>
        </Segment>
      </nav >
    )
  }
}
