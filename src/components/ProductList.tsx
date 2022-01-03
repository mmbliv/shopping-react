import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useFilterContext } from '../context/filter_context'
const ProductList = () => {
    const { filter_products: products } = useFilterContext()

    return (
        <>
            {/* <GridView products={products} /> */}
            <ListView products={products} />
        </>
    )
}

export default ProductList
