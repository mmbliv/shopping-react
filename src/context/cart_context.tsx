import React, { useContext, useEffect, useReducer } from "react"
import { singleProductType } from './products_context'
import reducer from '../reducers/cart_reducer'
import { ActionKind } from '../reducers/products_reducer'


export type singleProductCartType = {
    name: string;
    price: number;
    quantity: number;
    stock: number;
    color: string;

    img: string;
    id: string;

}
export type CartStateType = {
    cart_products: singleProductCartType[];
    addCart: (amount: number, color: string, product: singleProductType) => void;
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    deleteProduct: (id: string) => void;
    clearCart: () => void;
    checkout_price: number;
    total_quantity: number;

}

// get local storage infor
const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart)
    } else {
        return []
    }
}
const initialState: CartStateType = {
    cart_products: getLocalStorage(),
    checkout_price: 0,
    total_quantity: 0,
    addCart: (amount, color, product) => { },
    addItem: (id) => { },
    removeItem: (id) => { },
    deleteProduct: (id) => { },
    clearCart: () => { }
}
const CartContext = React.createContext(initialState)



export const CartProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart_products))
        dispatch({ type: ActionKind.CACULATE_PRODUCTS })
    }, [state.cart_products])

    const addCart = (amount: number, color: string, product: singleProductType) => {
        dispatch({ type: ActionKind.ADD_CART, payload: { kind: 'addToCart', amount, color, product } })
    }
    const addItem = (id: string) => {
        dispatch({ type: ActionKind.ADD_ITEM, payload: { kind: 'addItem', id } })
    }
    const removeItem = (id: string) => {
        dispatch({ type: ActionKind.REMOVE_ITEM, payload: { kind: 'removeItem', id } })
    }
    const deleteProduct = (id: string) => {
        dispatch({ type: ActionKind.DELETE_PRODUCT, payload: { kind: 'deleteProduct', id } })

    }
    const clearCart = () => {
        dispatch({ type: ActionKind.ClEAR_CART })
    }
    return (
        <CartContext.Provider value={{ ...state, addCart, addItem, removeItem, deleteProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCartContext = () => {
    return useContext(CartContext)

}



