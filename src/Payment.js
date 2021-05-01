import React from 'react'
import { Link } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'


function Payment() {
    const [state, dispatch] = useStateValue()

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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
