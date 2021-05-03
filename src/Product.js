import React, { useEffect } from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'
import history from './history'
import { db } from './firebase'

function Product({ title, image, price, rating, id }) {
    const [state, dispatch] = useStateValue()
    // console.log(state.basket);

    const addToBasket = () => {
        // dispatch some action
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
        // history.push('/checkout')
    }

    // to save the basket items for user 

    // useEffect(() => {
    //     if (state.user) {
    //         db
    //             .collection('users')
    //             .doc(state.user?.uid)
    //             .collection('basketItems')
    //             .doc('def')
    //             .set({
    //                 basket: state.basket,
    //             })
    //     }
    // }, [state.basket, state.user])

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {
                        Array(rating).fill().map((_, i) => {
                            return (
                                <p>⭐</p>
                            )
                        })
                    }

                </div>
            </div>
            <img
                src={image}
                alt='product logo'
            />
            <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
