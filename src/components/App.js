import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';
import SignInPage from './SignInPage';
import FoodIndexPage from './FoodIndexPage';
import FoodShowPage from './FoodShowPage';

class App extends Component {
  state = {
    currentUser: null,
    loading: true,
    cart: [],
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
      const cart = await User.cart(user.id);
      if (cart) {
        this.setState({ cart })
      };
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    };


  };

  signOut = () => {
    this.setState({ currentUser: null })
  };

  addToCart = (params) => {
    this.setState({ cart: [...this.state.cart, params] });
  };

  render() {
    if (this.state.loading) {
      return <div />;
    };

    return (
      <BrowserRouter>
        <div>
          <header>
            <NavBar currentUser={this.state.currentUser} onSignOut={this.signOut} cartCount={this.state.cart.length} />
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/foods" component={FoodIndexPage} />
            <Route
              exact path="/foods/:id"
              render={routeProps => (
                <FoodShowPage {...routeProps} cartCount={this.state.cart.length} onAddToCart={params => this.addToCart(params)} cartDetails={this.state.cart} />
              )} />
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
