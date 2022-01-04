import React from 'react'
import { ActionKind } from './products_reducer'
import { FilterStateType } from '../context/filter_context'
import { productsType } from '../context/products_context'
type ActionType = {
    type: ActionKind;
    payload?: productsType[]
}

const filter_reducer = (state: FilterStateType, action: ActionType): FilterStateType => {
    if (action.type === ActionKind.FILTER_PRODUCT) {
        return { ...state, filter_products: [...action.payload!], all_products: [...action.payload!] }

    }
    if (action.type === ActionKind.GRID_VIEW) {
        return { ...state, grid_view: true }
    }
    if (action.type === ActionKind.LIST_VIEW) {
        return { ...state, grid_view: false }
    }
    return state
}

export default filter_reducer
