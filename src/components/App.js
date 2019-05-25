import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';
import SignInPage from './SignInPage';
import FoodIndexPage from './FoodIndexPage';

class App extends Component {
  state = {
    currentUser: null,
    loading: true
  };

  componentDidMount() {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    try {
      const user = await User.current()
      if (user.id) {
        this.setState({ currentUser: user });
      };
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  signOut = () => {
    this.setState({ currentUser: null })
  };

  render() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <BrowserRouter>
        <div>
          <header>
            <NavBar currentUser={this.state.currentUser} onSignOut={this.signOut} />
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/foods" component={FoodIndexPage} />
            <Route exact path="/sign-up" render={routeProps => (
              <SignUpPage {...routeProps} onSignUpPage={this.getCurrentUser} />
            )} />
            <Route exact path="/sign-in" render={(routeProps) => (
              <SignInPage {...routeProps} onSignIn={this.getCurrentUser} />
            )} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
