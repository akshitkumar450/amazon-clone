import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'


function CheckoutProduct(props) {
    const [state, dispatch] = useStateValue()

    const removeFromBasket = (id) => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            item: id
        })
    }

    return (
        <div className='checkoutProduct'>
            <img src={props.image} className='checkoutProduct__image' alt='' />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{props.title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <p className='checkoutProduct__rating'>
                    {
                        Array(props.rating).fill().map((_, i) => {
                            return <p>⭐</p>
                        })
                    }
                </p>
                <button onClick={() => removeFromBasket(props.id)}>remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
