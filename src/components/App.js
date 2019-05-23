import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';
import SignInPage from './SignInPage';

class App extends Component {
  state = {
    currentUser: null,
    loading: true
  };

  componentDidMount() {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    const user = await User.current()
    try {
      if (user.id) {
        this.setState({ currentUser: user });
      };
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div />;
    }

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
            <Route exact path="/sign-in" component={SignInPage} />            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
