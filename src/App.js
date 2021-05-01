import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider'



function App() {
  const [state, dispatch] = useStateValue()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('USER', authUser);
      if (authUser) {
        //user just logged in /was logged in
        dispatch({
          type: 'SET_USER',
          payload: authUser
        })
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          payload: null
        })
      }
    })
  }, [])

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
