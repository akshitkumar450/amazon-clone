export const initialState = {
    basket: [],
    user: null
}

// selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

// export const getBasketTotal = (basket) => {
//     return (
//         basket?.reduce((amount, item) => {
//             return item.price + amount
//         }, 0)
//     )
// }

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case 'REMOVE_FROM_BASKET':
            // it will only finds the first item index for item to be removed
            const index = state.basket.findIndex((item) => item.id === action.item)
            let newBasket = [...state.basket]
            if (index >= 0) {
                newBasket.splice(index, 1)
            }
            return {
                ...state,
                basket: newBasket
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer