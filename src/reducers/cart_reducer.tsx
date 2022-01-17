
import { ActionKind } from './products_reducer'
import { CartStateType } from '../context/cart_context'
import { productsType } from '../context/products_context'

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
    id: string;
    color: string
}
type removeItem = {
    kind: 'removeItem';
    id: string;
    color: string
}
type deleteProduct = {
    kind: 'deleteProduct';
    id: string;
    color: string
}
type ActionType = {
    type: ActionKind;
    payload?: addToCart | loadCartProducts | addItem | removeItem | deleteProduct
}

const cart_reducer = (state: CartStateType, action: ActionType): CartStateType => {
    if (action.type === ActionKind.LOAD_CART_PRODUCTS && action.payload?.kind === 'loadCartProducts') {
        return { ...state, all_products: action.payload.products }
    }
    // if(action.type===ActionKind.LOAD_ADDED_CART_PRODUCTS){
    //     return {...state,cart_products:[...state.cart_products]
    // }
    if (action.type === ActionKind.ADD_CART && action.payload?.kind === 'addToCart') {
        const { id, amount, color, stock } = action.payload
        // check if the item is already exist in the cart
        if (state.cart_products.some(product => product.id === id && product.choosed_color === color)) {

            let addProducts = state.cart_products.map((product) => {
                if (product.id === id && (product.single_quantity! + amount) < stock && product.choosed_color === color) {
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
        const { id, color } = action.payload
        let products = state.cart_products.map((product) => {
            if (product.id === id && product.choosed_color === color && product.single_quantity! < product.stock) {
                return { ...product, single_quantity: product.single_quantity! + 1, single_total_price: (product.single_quantity! + 1) * product.price }
            } else {
                return { ...product }
            }

        })

        return { ...state, cart_products: products }

    }
    if (action.type === ActionKind.REMOVE_ITEM && action.payload?.kind === 'removeItem') {
        const { id, color } = action.payload
        let products = state.cart_products.map((product) => {
            if (product.id === id && product.choosed_color === color && product.single_quantity! > 0) {
                return { ...product, single_quantity: product.single_quantity! - 1, single_total_price: (product.single_quantity! - 1) * product.price }
            } else {
                return { ...product }
            }

        })

        return { ...state, cart_products: products }

    }
    if (action.type === ActionKind.DELETE_PRODUCT && action.payload?.kind === 'deleteProduct') {
        const { id, color } = action.payload
        let products = state.cart_products.filter((product) => { return (product.id === id && product.choosed_color === color) === false })
        return { ...state, cart_products: products }
    }
    if (action.type === ActionKind.ClEAR_CART) {
        return { ...state, cart_products: [] }

    }
    return { ...state }
}

export default cart_reducer
