
import React, { useContext, useEffect, useReducer } from "react"
import reducer from '../reducers/filter_reducer'
import { ActionKind } from '../reducers/products_reducer'
import { productsType } from './products_context'
import { useProductsContext } from "./products_context"

export type FilterStateType = {
    filter_products: productsType[];
    all_products: productsType[];
    grid_view: boolean;
    setGridView: () => void;
    setListView: () => void;
    searchProducts: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    cleanFilter: () => void;
    sort: string;
    filters: {
        search_text: string,
        company: string,
        category: string,
        color: string,
        min_price: number,
        max_price: number,
        price: number,
        shipping: boolean
    }
}
const initialState: FilterStateType = {
    filter_products: [],
    all_products: [],
    grid_view: false,
    setGridView: () => { },
    setListView: () => { },
    setSort: (e) => { },
    searchProducts: (e) => { },
    cleanFilter: () => { },
    sort: 'price-lowest',
    filters: {
        search_text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    }

}
const FilterContext = React.createContext(initialState)

export const FilterProvider: React.FC = ({ children }) => {
    const { products } = useProductsContext()
    const [state, dispatch] = useReducer(reducer, initialState)
    // get the products data from productscontext
    useEffect(() => {
        dispatch({ type: ActionKind.FILTER_PRODUCT, payload: products })
    }, [products])
    // load the sorted data according to the sort method
    // load the filtered data according to the filter method
    useEffect(() => {
        dispatch({ type: ActionKind.FILTER_START })
        dispatch({ type: ActionKind.SORT_PRODUCTS })
    }, [products, state.sort, state.filters])
    // set the view to grid or list
    const setGridView = () => {
        dispatch({ type: ActionKind.GRID_VIEW })
    }
    const setListView = () => {
        dispatch({ type: ActionKind.LIST_VIEW })
    }
    // choose how to sort the data
    const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: ActionKind.SORT_METHOD, payload: e.target.value })
    }
    // search products

    const searchProducts = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // let name: string
        // let value: strings


        let name = e.target.name
        let value = e.target.value
        dispatch({ type: ActionKind.SEARCH_PRODUCTS, payload: { name, value } })


    }
    const cleanFilter = () => {

    }

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, setSort, searchProducts, cleanFilter }}>
            {children}
        </FilterContext.Provider>
    )
}
export const useFilterContext = () => {
    return useContext(FilterContext)

}

