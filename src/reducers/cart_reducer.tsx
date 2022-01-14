import React from 'react'
import products_reducer, { ActionKind } from './products_reducer'
import { CartStateType } from '../context/cart_context'
import { singleProductType, productsType } from '../context/products_context'
import Product from '../components/Product'
type addToCart = {
    kind: 'addToCart';
    amount: number;
    color: string;
    id: string;
    stock: number
}
type loadCartProducts = {
    kind: 'loadCartProducts';
    products: productsType[]
}
type addItem = {
    kind: 'addItem';
    id: string
}
type removeItem = {
    kind: 'removeItem';
    id: string
}
type ActionType = {
    type: ActionKind;
    payload?: addToCart | loadCartProducts | addItem | removeItem
}

const cart_reducer = (state: CartStateType, action: ActionType): CartStateType => {
    if (action.type === ActionKind.LOAD_CART_PRODUCTS && action.payload?.kind === 'loadCartProducts') {
        return { ...state, all_products: action.payload.products }
    }
    if (action.type === ActionKind.ADD_CART && action.payload?.kind === 'addToCart') {
        const { id, amount, color, stock } = action.payload

        if (state.cart_products.some(product => product.id === id)) {

            let addProducts = state.cart_products.map((product) => {
                if (product.id === id && product.choosed_color === color) {
                    return { ...product, single_quantity: product.single_quantity! + amount }
                } else {
                    return { ...product }
                }
            })
            return { ...state, cart_products: addProducts }
        } else {
            let findAddedProduct = state.all_products.find((item) => item.id === id)
            let newAddedProduct = { ...findAddedProduct!, single_quantity: amount, choosed_color: color, single_total_price: amount * findAddedProduct!.price, stock }
            return { ...state, cart_products: [...state.cart_products, newAddedProduct] }
        }


    }
    if (action.type === ActionKind.ADD_ITEM && action.payload?.kind === 'addItem') {
        const { id } = action.payload
        let products = state.cart_products.map((product) => {
            if (product.id === id && product.single_quantity! < product.stock) {
                return { ...product, single_quantity: product.single_quantity! + 1 }
            } else {
                return { ...product }
            }

        })

        return { ...state, cart_products: products }

    }
    if (action.type === ActionKind.REMOVE_ITEM && action.payload?.kind === 'removeItem') {
        const { id } = action.payload
        let products = state.cart_products.map((product) => {
            if (product.id === id && product.single_quantity! > 0) {
                return { ...product, single_quantity: product.single_quantity! - 1 }
            } else {
                return { ...product }
            }

        })

        return { ...state, cart_products: products }

    }
    return { ...state }
}

export default cart_reducer
