import { type } from "os"
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
    setListView: () => void
}
const initialState: FilterStateType = {
    filter_products: [],
    all_products: [],
    grid_view: false,
    setGridView: () => { },
    setListView: () => { }

}
const FilterContext = React.createContext(initialState)

export const FilterProvider: React.FC = ({ children }) => {
    const { products } = useProductsContext()
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({ type: ActionKind.FILTER_PRODUCT, payload: products })
    }, [products])
    const setGridView = () => {
        dispatch({ type: ActionKind.GRID_VIEW })
    }
    const setListView = () => {
        dispatch({ type: ActionKind.LIST_VIEW })
    }

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView }}>
            {children}
        </FilterContext.Provider>
    )
}
export const useFilterContext = () => {
    return useContext(FilterContext)

}

