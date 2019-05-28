import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';
import SignInPage from './SignInPage';
import FoodIndexPage from './FoodIndexPage';
import FoodShowPage from './FoodShowPage';
import Food from '../api/food';

class App extends Component {
  state = {
    currentUser: null,
    loading: true,
    cartModel: [],
  };

  componentDidMount = async () => {
    await this.getCurrentUser();
  };

  getCurrentUser = async () => {
    try {
      const user = await User.current()
      if (user.id) {
        this.setState({ currentUser: user });
      };
      const cartModel = await User.cart(user.id);
      if (cartModel) {
        this.setState({ cartModel })
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
    this.setState({ cartModel: [...this.state.cartModel, params] });
  };

  fetchFoods = () => {
    const order = [];
    this.state.cartModel.map(item => {
      Food.one(item.foodId).then(
        food => order.push({ food: food, quantity: item.quantity })
      );
    });
    return order;
  };

  render() {
    if (this.state.loading) {
      return <div />;
    };

    return (
      <BrowserRouter>
        <div>
          <header>
            <NavBar currentUser={this.state.currentUser} onSignOut={this.signOut} cartCount={this.state.cartModel.length} />
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/foods" component={FoodIndexPage} />
            <Route
              exact path="/foods/:id"
              render={routeProps => (
                <FoodShowPage {...routeProps} cartCount={this.state.cartModel.length} onAddToCart={params => this.addToCart(params)} cartDetails={this.fetchFoods()} />
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
