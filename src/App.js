import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Checkout from './Checkout';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/' component={Home} exact={true} />
          <Route path='/checkout' component={Checkout} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
