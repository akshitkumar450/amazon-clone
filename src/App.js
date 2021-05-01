import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/' exact={true} >
            <Header />
            <Home />
          </Route>
          <Route path='/checkout' exact={true} >
            <Header />
            <Checkout />
          </Route>
          <Route path='/login' exact={true} >
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
