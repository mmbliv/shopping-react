
import { ActionKind } from './products_reducer'
import { CartStateType, singleProductCartType } from '../context/cart_context'
import { singleProductType } from '../context/products_context'

type addToCart = {
    kind: 'addToCart';
    amount: number;
    color: string;
    product: singleProductType
}

type addItem = {
    kind: 'addItem';
    id: string;

}
type removeItem = {
    kind: 'removeItem';
    id: string;

}
type deleteProduct = {
    kind: 'deleteProduct';
    id: string;

}
type ActionType = {
    type: ActionKind;
    payload?: addToCart | addItem | removeItem | deleteProduct
}

const cart_reducer = (state: CartStateType, action: ActionType): CartStateType => {
    if (action.type === ActionKind.CACULATE_PRODUCTS) {
        const { totalItems, totalPrice } = state.cart_products.reduce((ack, item) => {
            ack.totalItems += item.quantity
            ack.totalPrice += item.quantity * item.price
            return ack
        }, { totalItems: 0, totalPrice: 0 })
        return { ...state, checkout_price: totalPrice, total_quantity: totalItems }
    }
    if (action.type === ActionKind.ADD_CART && action.payload?.kind === 'addToCart') {
        const { amount, color, product } = action.payload
        // check if the item is already exist in the cart
        const isItemExist = state.cart_products.find(item => item.id === product.id + color)
        if (isItemExist) {
            let addProducts = state.cart_products.map((item) => {
                if (item.id === product.id + color && (item.quantity + amount) <= item.stock) {
                    return { ...item, quantity: item.quantity + amount }
                } else {
                    return item
                }
            })
            return { ...state, cart_products: addProducts }
        } else {
            let quantity: number
            if (amount <= product.stock) {
                quantity = amount
            } else {
                quantity = product.stock
            }
            let newAddedProduct: singleProductCartType = {
                name: product.name,
                price: product.price,
                quantity,
                stock: product.stock,
                color,

                img: product.imgUrls[0],
                id: product.id + color
            }


            return { ...state, cart_products: [...state.cart_products, newAddedProduct] }
        }


    }
    if (action.type === ActionKind.ADD_ITEM && action.payload?.kind === 'addItem') {
        const { id } = action.payload
        let products = state.cart_products.map((item) => {
            if (item.id === id && item.quantity < item.stock) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
        return { ...state, cart_products: products }

    }
    if (action.type === ActionKind.REMOVE_ITEM && action.payload?.kind === 'removeItem') {
        const { id } = action.payload
        let products = state.cart_products.map((item) => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item
            }
        })
        return { ...state, cart_products: products }

    }
    if (action.type === ActionKind.DELETE_PRODUCT && action.payload?.kind === 'deleteProduct') {
        const { id } = action.payload
        let products = state.cart_products.filter((item) => item.id !== id)
        return { ...state, cart_products: products }
    }
    if (action.type === ActionKind.ClEAR_CART) {
        return { ...state, cart_products: [], checkout_price: 0, total_quantity: 0 }

    }
    throw new Error(`No Matching "${action.type}" - action type`)
}
export default cart_reducer
