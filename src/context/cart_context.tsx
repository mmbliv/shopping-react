import React, { useContext, useEffect, useReducer } from "react"
import { productsType } from './products_context'
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
    addItem: (id: string, color: string) => void;
    removeItem: (id: string, color: string) => void;
    deleteProduct: (id: string, color: string) => void

}

const initialState: CartStateType = {
    all_products: [],
    cart_products: [],
    total_price: 0,
    total_quantity: 0,
    shipping_fee: 0,
    addCart: (amount, color, id, stock) => { },
    addItem: (id, color) => { },
    removeItem: (id, color) => { },
    deleteProduct: (id, color) => { }
}
const CartContext = React.createContext(initialState)

export const CartProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { products } = useProductsContext()
    useEffect(() => {

        dispatch({ type: ActionKind.LOAD_CART_PRODUCTS, payload: { kind: 'loadCartProducts', products } })
    }, [products, state.cart_products])
    const addCart = (amount: number, color: string, id: string, stock: number) => {
        dispatch({ type: ActionKind.ADD_CART, payload: { kind: 'addToCart', amount, color, id, stock } })
    }
    const addItem = (id: string, color: string) => {
        dispatch({ type: ActionKind.ADD_ITEM, payload: { kind: 'addItem', id, color } })
    }
    const removeItem = (id: string, color: string) => {
        dispatch({ type: ActionKind.REMOVE_ITEM, payload: { kind: 'removeItem', id, color } })
    }
    const deleteProduct = (id: string, color: string) => {
        dispatch({ type: ActionKind.DELETE_PRODUCT, payload: { kind: 'deleteProduct', id, color } })

    }
    return (
        <CartContext.Provider value={{ ...state, addCart, addItem, removeItem, deleteProduct }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCartContext = () => {
    return useContext(CartContext)

}



