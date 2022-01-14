import React, { useContext, useEffect, useReducer } from "react"
import { productsType } from './products_context'
import reducer from '../reducers/cart_reducer'
import { ActionKind } from '../reducers/products_reducer'
import { useProductsContext } from "./products_context"
interface CartSingleStateType extends productsType {
    single_quantity: number;
    choosed_color: string;
    single_total_price: number

}
export type CartStateType = {
    all_products: productsType[];
    total_price: number;
    total_quantity: number;
    cart_products: CartSingleStateType[];
    shipping_fee: number;
    addCart: (amount: number, color: string, id: string) => void

}
const initialState: CartStateType = {
    all_products: [],
    cart_products: [],
    total_price: 0,
    total_quantity: 0,
    shipping_fee: 0,
    addCart: (amount, color, id) => { }
}
const CartContext = React.createContext(initialState)

export const CartProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { products } = useProductsContext()
    useEffect(() => {
        dispatch({ type: ActionKind.LOAD_CART_PRODUCTS, payload: products })
    }, [products])
    const addCart = (amount: number, color: string, id: string) => {
        dispatch({ type: ActionKind.ADD_CART, payload: { amount, color, id } })
    }
    return (
        <CartContext.Provider value={{ ...state, addCart }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCartContext = () => {
    return useContext(CartContext)

}


