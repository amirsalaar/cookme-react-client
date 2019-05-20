import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';

class App extends Component {
  state = {
    currentUser: null,
    loading: true
  };

  getCurrentUser = () => {
    return
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/sign-up" render={routeProps => (
              <SignUpPage {...routeProps} onSignUp={this.getCurrentUser} />
            )} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
