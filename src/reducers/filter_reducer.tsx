
import { ActionKind } from './products_reducer'
import { FilterStateType } from '../context/filter_context'
import { productsType } from '../context/products_context'
type ActionType = {
    type: ActionKind;
    payload?: string | productsType[] | { name: string, value: string | number | boolean }
}

const filter_reducer = (state: FilterStateType, action: ActionType): FilterStateType => {
    if (action.type === ActionKind.FILTER_PRODUCT) {
        if (Array.isArray(action.payload)) {
            let maxPrice = 0
            let minPrice!: number
            action.payload.forEach((i) => {
                if (i.price > maxPrice) {
                    maxPrice = i.price
                }
                if (!minPrice) {
                    minPrice = i.price
                } else {
                    if (i.price < minPrice) {
                        minPrice = i.price
                    }
                }
            })
            return { ...state, filter_products: [...action.payload!], all_products: [...action.payload!], filters: { ...state.filters, max_price: maxPrice, min_price: minPrice } }
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
        const { search_text, company, color, category, price, max_price, min_price, shipping } = state.filters
        let tempProducts = [...state.all_products]
        if (search_text) {
            tempProducts = tempProducts.filter((item) => {
                return item.name.toLowerCase().startsWith(search_text)
            })
        }
        if (company !== 'ALL') {
            tempProducts = tempProducts.filter((item) => {
                return item.company.toLocaleLowerCase() === company

            })
        }
        if (color !== 'ALL') {
            tempProducts = tempProducts.filter((item) => {
                return item.colors.includes(color)
            })
        }
        if (category !== 'ALL') {
            tempProducts = tempProducts.filter((item) => {
                return item.category.toLocaleLowerCase() === category
            })
        }
        if (price !== 0 && price !== max_price) {
            tempProducts = tempProducts.filter((item) => {
                return item.price >= min_price && item.price <= price
            })
        }
        if (shipping) {
            tempProducts = tempProducts.filter((item) => {
                return item.shipping === true
            })

        }

        return { ...state, filter_products: tempProducts }


    }
    if (action.type === ActionKind.CLEAR_FILTERS) {
        return {
            ...state, filters: {
                ...state.filters,
                search_text: '',
                company: 'ALL',
                category: 'ALL',
                color: 'ALL',
                price: state.filters.max_price,
                shipping: false
            }
        }
    }
    return state
}

export default filter_reducer
