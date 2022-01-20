import React, { useContext, useEffect, useReducer } from "react";
import { products_url as url } from "../utils/constant";
import reducer from "../reducers/products_reducer";
import { ActionKind } from "../reducers/products_reducer";
export type productsType = {
    id: string;
    name: string;
    price: number;
    image: string;
    colors: string[];
    company: string;
    shipping: boolean;
    description: string;
    category: string;
    featured?: boolean;

}
export type singleProductType = {
    category: string;
    colors: string[];
    company: string;
    description: string;
    id: string;
    images: { url: string }[];
    name: string;
    price: number;
    reviews: number;
    shipping: boolean;
    stars: number;
    stock: number;
    imgUrls: string[];

}
export type initialStateType = {
    products_loading: boolean;
    products_error: boolean;
    products: productsType[];
    featured_products: productsType[];
    single_product_loading: boolean;
    single_product_error: boolean;
    single_product: singleProductType;
    fetchSingleProduct: (url: string) => Promise<void>

}

const initialState: initialStateType = {
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {
        category: '',
        colors: [],
        company: '',
        description: '',
        id: '',
        images: [],
        name: '',
        price: 0,
        reviews: 0,
        shipping: true,
        stars: 0,
        stock: 0,
        imgUrls: ['']
    },
    fetchSingleProduct: async (url) => { },

}

const ProductsContext = React.createContext(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchProducts = async (url: string) => {
        dispatch({ type: ActionKind.GET_PRODUCTS_BEGIN })
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch({ type: ActionKind.GET_PRODUCTS_SUCCESS, payload: data })

        } catch (error) {
            dispatch({ type: ActionKind.GET_PRODUCTS_ERROR })
        }


    }
    const fetchSingleProduct = async (url: string) => {
        dispatch({ type: ActionKind.GET_SINGLE_PRODUCT_BEGIN })
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch({ type: ActionKind.GET_SINGLE_PRODUCT_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: ActionKind.GET_SINGLE_PRODUCT_ERROR })
        }
    }
    useEffect(() => {
        fetchProducts(url)
    }, [])
    return (
        <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}
export const useProductsContext = () => {
    return useContext(ProductsContext)

}



