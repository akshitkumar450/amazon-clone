import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom'
import CurrencyFormat from "react-currency-format";

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from './axios'

function Payment() {
    const history = useHistory()
    const [state, dispatch] = useStateValue()

    const stripe = useStripe()
    const elements = useElements()

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    //  clientSecret help stripe to  get to know how much to charge
    const [clientSecret, setClientSecret] = useState(true)

    // this will load when the app loads and when the items in the basket changes
    // bcz when items in the basket changes price  will be changed 
    // when the basket changes we want a new clientsecret for new payment
    useEffect(() => {
        // with clientSecret stripe will get to know how much to charge
        // generate the special stripe secret which allows us to charge a customer a amount
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post', //stripe ->amount in subunits (dollar to cents)
                url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`
            })

            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [state.basket])

    console.log('secret-->>> 😎😎😎😎', clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if will block us to click button only one time
        setProcessing(true)

        //  used to clientSecret (how to charge) 
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation 
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            // to swap pages
            history.replace('/orders')
        })

    }

    const handleChange = (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        // console.log(e);
        // e.empty :boolean value
        //if there is  any card number e.empty will false else true
        setDisabled(e.empty);
        // if there is any error in the card detials
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    checkout (<Link to='/checkout' >{state.basket?.length}items </Link>)
                </h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>delivery address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{state.user && state.user.email}</p>
                        <p>street 12 </p>
                        <p>california,US</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {
                            state.basket.map((item, idx) => {
                                return (
                                    <CheckoutProduct
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        rating={item.rating}
                                        image={item.image}
                                    />
                                )
                            })
                        }

                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>payment method</h3>
                    </div>
                    <div className='payment__details'>
                        {/*stripe  */}
                        <form onSubmit={handleSubmit}>
                            {/* to get the card element from stripe to enter card details */}
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>order total:{value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(state.basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> : 'buy now'}</span>
                                </button>
                            </div>

                            {/*for errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

// firebase clound functions (for backend ->nodejs)
// 1 firebase init
// click function spacebar and enter (javascript)
// 2 cd functions
// 3 firebase emulators:start