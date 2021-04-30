import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider'

function Subtotal() {
    const [state, dispatch] = useStateValue()
    // console.log(state.basket.length);
    // console.log(state.basket);

    // const getTotal = () => {
    //     let total = 0;
    //     for (let i = 0; i < state.basket.length; i++) {
    //         total = total + state.basket[i].price;
    //     }
    //     console.log(total);
    //     return total
    // }

    // const getTotal = () => {
    //     let total = 0;
    //     state.basket.map((item) => {
    //         total = total + item.price
    //         console.log(total);
    //         return total
    //     });
    //     return total
    // }

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <React.Fragment>
                        <p>
                            {/* Part of the homework */}
                            Subtotal ({state.basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </React.Fragment>
                )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button >Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
