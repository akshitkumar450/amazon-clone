import React, { useEffect, useState } from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import { db } from './firebase'


function Checkout() {
    const [state, dispatch] = useStateValue()
    // console.log(state.basket);

    // to get the basket items for a user
    // const [basketitems, setBasketitems] = useState([])
    // useEffect(() => {
    //     if (state.user) {
    //         db
    //             .collection('users')
    //             .doc(state.user?.uid)
    //             .collection('basketItems')
    //             .onSnapshot((snapshot) => (
    //                 setBasketitems(snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     data: doc.data()
    //                 })))
    //             ))
    //     } else {
    //         setBasketitems([])
    //     }
    // }, [state.user, state.basket])

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                <div>
                    <h3>hello , {state.user && state.user.email}</h3>
                    <h2 className='checkout__title'>
                        your shopping basket
                    </h2>

                    {
                        state.basket.map((item, index) => {
                            return (
                                <div key={index}>
                                    <CheckoutProduct
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        image={item.image}
                                        rating={item.rating}
                                    />
                                </div>

                            )
                        })
                    }

                    {/*
                        basketitems.map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        item.data.basket.map((el) => {
                                            return (
                                                <CheckoutProduct
                                                    id={el.id}
                                                    title={el.title}
                                                    price={el.price}
                                                    image={el.image}
                                                    rating={el.rating}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    */ }
                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
