import React, { useContext, useEffect, useReducer } from "react"
import { singleProductType, productsType } from './products_context'
import reducer from '../reducers/cart_reducer'
import { ActionKind } from '../reducers/products_reducer'
import { useProductsContext } from "./products_context"

export type CartStateType = {
    all_products: productsType[];
    total_price: number;
    total_quantity: number;
    cart_products: productsType[];
    shipping_fee: number;
    addCart: (amount: number, color: string, id: string, stock: number) => void;
    addItem: (id: string) => void;
    removeItem: (id: string) => void

}

const initialState: CartStateType = {
    all_products: [],
    cart_products: [],
    total_price: 0,
    total_quantity: 0,
    shipping_fee: 0,
    addCart: (amount, color, id, stock) => { },
    addItem: (id) => { },
    removeItem: (id) => { }
}
const CartContext = React.createContext(initialState)

export const CartProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { products } = useProductsContext()
    useEffect(() => {
        dispatch({ type: ActionKind.LOAD_CART_PRODUCTS, payload: { kind: 'loadCartProducts', products } })
    }, [products])
    const addCart = (amount: number, color: string, id: string, stock: number) => {
        dispatch({ type: ActionKind.ADD_CART, payload: { kind: 'addToCart', amount, color, id, stock } })
    }
    const addItem = (id: string) => {
        dispatch({ type: ActionKind.ADD_ITEM, payload: { kind: 'addItem', id } })
    }
    const removeItem = (id: string) => {
        dispatch({ type: ActionKind.REMOVE_ITEM, payload: { kind: 'removeItem', id } })
    }
    return (
        <CartContext.Provider value={{ ...state, addCart, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCartContext = () => {
    return useContext(CartContext)

}



