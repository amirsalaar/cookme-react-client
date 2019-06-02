import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import { Link, NavLink } from 'react-router-dom';
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Sticky,
  Segment,
  Label
} from "semantic-ui-react";
import logo from '../assets/images/logo.PNG';
import Session from "../api/session";
import DashboardMenuItem from "./DashboardMenuItem";

// const NavBarMobile = ({
//   children,
//   leftItems,
//   onPusherClick,
//   onToggle,
//   rightItems,
//   visible,
//   currentUser,
//   cartCount,
//   onSignOutClick
// }) => (


function NavBarMobile(props) {
  const {
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible,
    currentUser,
    cartCount,
    onSignOutClick
  } = props;

  const passDownSignOut = () => {
    onSignOutClick();
  }
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        direction={'top'}
        animation="overlay"
        icon="labeled"
        vertical
        visible={visible}
      >
        <Menu.Item
          name='foods'
          header as={NavLink} exact to="/foods"
        // onClick={this.handleItemClick}
        />
        {currentUser ? (
          <React.Fragment>
            <Menu.Item
              name='shopping basket'
              header as={NavLink} exact to="/checkout"
            // onClick={this.handleItemClick}
            >
              <Icon name='cart' />
              Shopping Cart
                      <Label size='small' basic color='teal'>
                {cartCount}
              </Label>
            </Menu.Item>

            <DashboardMenuItem
              currentUser={currentUser}
              onSignOutClick
            />

            <Menu.Item
              as={Link} to='/'
              onClick={passDownSignOut()}
            >
              <Icon circular name='sign out' className='Change' /> Sign Out
                    </Menu.Item>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <Menu.Item
                name='Sign Up'
                header as={NavLink} exact to="/sign-up"
              // onClick={this.handleItemClick}
              />

              <Menu.Item
                name='Sign In'
                header as={NavLink} exact to="/sign-in"
              // onClick={this.handleItemClick}
              />
            </React.Fragment>
          )}
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
      // style={{ minHeight: "100vh" }}
      >
        <nav>
          <Sticky>
            <Segment>
              <Menu>
                <Menu.Item
                  style={{ height: 50, }}
                  header as={Link} to="/"
                  onClick={() => { this.setState({ activeItem: '' }) }}
                >
                  <img src={logo} alt="Logo" style={{ width: 80 }} />
                  <div style={{ fontSize: 20, marginLeft: 0, fontWeight: 700 }}>CookMe</div>
                </Menu.Item>
                <Menu.Menu position="right">
                </Menu.Menu>
                <Menu.Item onClick={onToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Segment>
          </Sticky>
        </nav>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

const NavBarDesktop = ({ currentUser, cartCount, onSignOutClick }) => (
  <nav>
    <Sticky>
      <Segment>
        <Menu>
          <Menu.Item
            style={{ height: 50, }}
            header as={Link} to="/"
            onClick={() => { this.setState({ activeItem: '' }) }}
          >
            <img src={logo} alt="Logo" style={{ width: 80 }} />
            <div style={{ fontSize: 20, marginLeft: 0, fontWeight: 700 }}>CookMe</div>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              name='foods'
              header as={NavLink} exact to="/foods"
            // onClick={this.handleItemClick}
            />
            {currentUser ? (
              <React.Fragment>
                <Menu.Item
                  name='shopping basket'
                  header as={NavLink} exact to="/checkout"
                // onClick={this.handleItemClick}
                >
                  <Icon name='cart' />
                  Shopping Cart
                      <Label size='small' basic color='teal'>
                    {cartCount}
                  </Label>
                </Menu.Item>

                <DashboardMenuItem
                  currentUser={currentUser}
                  onSignOutClick
                />

                <Menu.Item
                  as={Link} to='/'
                // onClick={handleSignOut} 
                >
                  <Icon circular name='sign out' className='Change' /> Sign Out
                    </Menu.Item>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Menu.Item
                    name='Sign Up'
                    header as={NavLink} exact to="/sign-up"
                  // onClick={this.handleItemClick}
                  />

                  <Menu.Item
                    name='Sign In'
                    header as={NavLink} exact to="/sign-in"
                  // onClick={this.handleItemClick}
                  />
                </React.Fragment>
              )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </Sticky>
  </nav>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>
    {children}
  </Container>
);

export class NavBar extends Component {
  state = {
    activeItem: '',
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { activeItem, visible } = this.state;
    const {
      currentUser,
      onSignOut,
      cartCount,
      children,
      leftItems,
      rightItems,
    } = this.props;

    const handleSignOut = () => {
      Session.destroy()
        .then(() => {
          onSignOut();
          this.setState({ activeItem: '' })
        })
    };

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            rightItems={rightItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
            currentUser={currentUser}
            onSignOutClick={() => handleSignOut}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop
            currentUser={currentUser}
            cartCount={cartCount}
            onSignOutClick={() => handleSignOut}
          />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];


