import React from 'react'
import { ActionKind } from './products_reducer'
import { CartStateType } from '../context/cart_context'
import { singleProductType, productsType } from '../context/products_context'
type addToCart = {
    kind: 'addToCart';
    amount: number;
    color: string;
    id: string
}
type loadCartProducts = {
    kind: 'loadCartProducts';
    products: productsType[]
}
type ActionType = {
    type: ActionKind;
    payload: addToCart | loadCartProducts
}

const cart_reducer = (state: CartStateType, action: ActionType): CartStateType => {
    if (action.type === ActionKind.LOAD_CART_PRODUCTS && action.payload.kind === 'loadCartProducts') {
        return { ...state, all_products: action.payload.products }
    }
    if (action.type === ActionKind.ADD_CART && action.payload.kind === 'addToCart') {
        const { id, amount, color } = action.payload

        let addedProduct = state.all_products.find((item) => item.id === id)
        let newAddedProduct = { ...addedProduct!, single_quantity: amount, choosed_color: color, single_total_price: amount * addedProduct!.price }
        return { ...state, cart_products: [...state.cart_products, newAddedProduct] }

    }
    return { ...state }
}

export default cart_reducer
