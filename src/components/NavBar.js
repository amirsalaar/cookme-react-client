import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Menu, Segment, Icon, Sticky, Header, Image, Label } from 'semantic-ui-react'
import logo from '../assets/images/logo.PNG'
import Session from '../api/session';
import DashboardMenuItem from './DashboardMenuItem';

export class NavBar extends Component {
  state = {
    activeItem: '',
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { currentUser, onSignOut } = this.props;

    const avatarUrl =
      currentUser && currentUser.avatar ? currentUser.avatar.url : undefined;

    const handleSignOut = () => {
      Session.destroy()
        .then(() => {
          onSignOut();
          this.setState({ activeItem: '' })
        })
    };

    const { activeItem, } = this.state;
    const { cartCount } = this.props;

    return (
      <nav>
        <Sticky>
          <Segment>
            <Menu stackable>
              <Menu.Item
                style={{ height: 50, }}
                header as={Link} to="/"
                onClick={() => { this.setState({ activeItem: '' }) }}
              >
                <img src={logo} alt="Logo" style={{ width: 80 }} />
                <div style={{ fontSize: 20, marginLeft: 0, fontWeight: 700 }}>CookMe</div>
              </Menu.Item>

              {/* <Menu.Item
                name='home'
                header as={NavLink} exact to="/"
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              /> */}
              <Menu.Item
                name='foods'
                header as={NavLink} exact to="/foods"
                active={activeItem === 'foods'}
                onClick={this.handleItemClick}
              />

              <Menu.Menu position='right'>
                {currentUser ? (
                  <React.Fragment>
                    <Menu.Item
                      name='shopping basket'
                      header as={NavLink} exact to="/cart"
                      active={activeItem === 'shopping basket'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='cart' />
                      Shopping Cart
                      <Label size='tiny' basic color='teal'>
                        {cartCount}
                      </Label>

                      {/* <Button animated='vertical'>
                        <Button.Content hidden>Shop</Button.Content>
                        <Button.Content visible>
                          <Icon name='shop' />
                        </Button.Content>
                      </Button> */}
                    </Menu.Item>

                    <Menu.Item>
                      <Header as='h6'>
                        <Image circular src={avatarUrl} /> <span style={{ marginLeft: 5, fontSize: 14, verticalAlign: 'middle' }}>{currentUser.full_name}</span>
                      </Header>
                    </Menu.Item>

                    <DashboardMenuItem currentUser={currentUser} />

                    <Menu.Item as={Link} to='/' onClick={handleSignOut} >
                      <Icon circular name='sign out' className='Change' />
                    </Menu.Item>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <Menu.Item
                        name='Sign Up'
                        header as={NavLink} exact to="/sign-up"
                        active={activeItem === 'Sign Up'}
                        onClick={this.handleItemClick}
                      />

                      <Menu.Item
                        name='Sign In'
                        header as={NavLink} exact to="/sign-in"
                        active={activeItem === 'Sign In'}
                        onClick={this.handleItemClick}
                      />
                    </React.Fragment>
                  )}
              </Menu.Menu>
            </Menu>
          </Segment>
        </Sticky>
      </nav >
    )
  }
}
