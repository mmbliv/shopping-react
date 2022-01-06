import React from 'react'
import { ActionKind } from './products_reducer'
import { FilterStateType } from '../context/filter_context'
import { productsType } from '../context/products_context'
type ActionType = {
    type: ActionKind;
    payload?: string | productsType[] | { name: string, value: string }
}

const filter_reducer = (state: FilterStateType, action: ActionType): FilterStateType => {
    if (action.type === ActionKind.FILTER_PRODUCT) {
        if (Array.isArray(action.payload)) {
            return { ...state, filter_products: [...action.payload!], all_products: [...action.payload!] }
        }
    }
    if (action.type === ActionKind.SEARCH_PRODUCTS) {
        if (typeof action.payload === 'object' && !Array.isArray(action.payload)) {
            return { ...state, filters: { ...state.filters, [action.payload.name]: action.payload.value } }
        }
    }
    if (action.type === ActionKind.GRID_VIEW) {
        return { ...state, grid_view: true }
    }
    if (action.type === ActionKind.LIST_VIEW) {
        return { ...state, grid_view: false }
    }
    if (action.type === ActionKind.SORT_METHOD) {
        if (typeof action.payload === 'string') {
            return { ...state, sort: action.payload! }
        }
    }
    if (action.type === ActionKind.SORT_PRODUCTS) {
        const { sort, filter_products } = state
        let tempProducts = [...filter_products]
        if (sort === 'price-lowest') {
            tempProducts = tempProducts.sort((a, b) =>
                a.price - b.price
            )
        }
        if (sort === 'price-highest') {
            tempProducts = tempProducts.sort((a, b) =>
                b.price - a.price
            )
        }
        if (sort === 'name-a') {
            tempProducts = tempProducts.sort((a, b) => {
                return a.name.localeCompare(b.name)
            }
            )
        }
        if (sort === 'name-z') {
            tempProducts = tempProducts.sort((a, b) => {
                return b.name.localeCompare(a.name)
            }
            )
        }

        return { ...state, filter_products: tempProducts }

    }
    if (action.type === ActionKind.FILTER_START) {

    }
    return state
}

export default filter_reducer
