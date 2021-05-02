import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import './Orders.css'
import { useStateValue } from './StateProvider'
import Order from './Order';

function Orders() {
    const [state, dispatch] = useStateValue()

    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (state.user) {
            db
                .collection('users')
                .doc(state.user?.uid)
                .collection('orders')
                .orderBy('createdAt', 'desc')
                .onSnapshot((snapshot) => (
                    setOrders(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }
    }, [state.user])

    return (
        <div className='orders'>
            <h1>Your orders</h1>
            <div className='orders__order'>
                {
                    orders?.map((order) => (
                        <Order order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
