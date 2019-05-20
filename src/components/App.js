import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
