import React from 'react'
import { ActionKind } from './products_reducer'
import { CartStateType } from '../context/cart_context'
import { productsType } from '../context/products_context'
type addCartPayloadType = {
    amount: number;
    color: string;
    id: string
}
type ActionType = {
    type: ActionKind;
    payload?: addCartPayloadType | productsType[]
}

const cart_reducer = (state: CartStateType, action: ActionType) => {
    if (action.type === ActionKind.LOAD_CART_PRODUCTS) {
        return { ...state, all_products: action.payload as productsType[] }

    }
    if (action.type === ActionKind.ADD_CART) {

        state.all_products.find((item) => item.id === (action.payload! as addCartPayloadType).id)
        return { ...state }
    }
    return { ...state }
}

export default cart_reducer
