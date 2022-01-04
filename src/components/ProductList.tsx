import React from 'react'
import GridView from './GridView'
import ListView from './ListView'

import { useFilterContext } from '../context/filter_context'
const ProductList = () => {

    const { filter_products: products, grid_view } = useFilterContext()
    return <>
        {grid_view ? <GridView products={products} /> : <ListView products={products} />}
    </>
    // if (grid_view) {
    //     return <GridView products={products} />
    // }
    // if (!grid_view) {
    //     return <ListView products={products} />
    // }
}

export default ProductList
