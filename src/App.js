import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider'
import Payment from './Payment';

// using stripe 
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// public stripe key
const promise = loadStripe('pk_test_51ImcUYLSnLgEhz6V68nrjlYTQXrzBAiRlZMtXeku0sa9veL7pVeVlw4R7YGNeUfJW6p2DpilGHkyoNl1SF2v1eRu00CxHyIms1')

function App() {
  const [state, dispatch] = useStateValue()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log('USER', authUser);
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
          <Route path='/payment' exact={true} >
            <Header />
            {/*to provide stripe to payment component (HOC) */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
