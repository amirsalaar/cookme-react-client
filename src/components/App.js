import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
// import { NavBar } from './ResponsiveNavBar';
import SignUpPage from './SignUpPage';
import { User } from '../api/user';
import SignInPage from './SignInPage';
import FoodIndexPage from './FoodIndexPage';
import FoodShowPage from './FoodShowPage';
import Food from '../api/food';
import CheckoutShowPage from './CheckoutShowPage';
import CheckoutSidebar from './CheckoutSidebar';


class App extends Component {
  state = {
    currentUser: null,
    loading: true,
    cartModel: [],
    cartDetails: [],
    currentLocation: null,
  };


  componentDidMount = () => {
    this.getCurrentUser();
    this.fetchFoods();
    this.getCurrentLocation();
  };

  getCurrentUser = async () => {
    try {
      const user = await User.current()
      if (user.id) {
        this.setState({ currentUser: user });
      };
      const cartModel = await User.cart(user.id);
      if (cartModel) {
        this.setState({ cartModel }, () => this.fetchFoods())
      };
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    };
  };

  getCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const currentCoords = position.coords;
        this.setState({
          currentLocation: {
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
          }
        })
      })
    }
  };

  signOut = () => {
    this.setState({ currentUser: null })
  };

  addToCart = (params) => {
    this.setState({ cartModel: [...this.state.cartModel, params] });
    this.fetchFoods()
  };

  fetchFoods = async () => {
    const orders = [];
    const ids = this.state.cartModel.map(cartItem => cartItem.foodId);
    const quantity = this.state.cartModel.map(cartItem => cartItem.quantity)
    const responses = await Food.multiple(ids);
    await Promise.all(responses).then(foods => foods.forEach((food, index) => orders.push({ food, quantity: quantity[index] })));
    this.setState({ cartDetails: orders })
  };

  render() {
    const { cartDetails, currentLocation } = this.state;
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
            <Route exact path="/foods" render={routeProps => (
              <FoodIndexPage
                {...routeProps}
                currentLocation={currentLocation}
              />
            )} />
            <Route
              exact path="/foods/:id"
              render={routeProps => (
                <FoodShowPage
                  {...routeProps}
                  cartCount={this.state.cartModel.length}
                  onAddToCart={params => this.addToCart(params)} cartDetails={cartDetails}
                />
              )} />
            <Route exact path="/sign-up" render={routeProps => (
              <SignUpPage
                {...routeProps}
                onSignUpPage={this.getCurrentUser}
              />
            )} />
            <Route exact path="/sign-in" render={(routeProps) => (
              <SignInPage
                {...routeProps}
                onSignIn={this.getCurrentUser}
              />
            )} />
            <Route exact path="/checkout" render={(routeProps) => (
              <CheckoutShowPage
                {...routeProps}
                currentUser={this.state.currentUser}
                cartDetails={cartDetails}
              />
            )} />
            <Route component={CheckoutSidebar} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
