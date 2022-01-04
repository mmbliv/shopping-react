
import React from 'react'
import { productsType } from '../context/products_context'
import styled from 'styled-components'
import Product from './Product'
type props = {
    products: productsType[]
}

const GridView: React.FC<props> = ({ products }) => {
    return (
        <Wrapper className='section'>
            {products.map((product) => {
                return <Product image={product.image} id={product.id} name={product.name} price={product.price} />
            })}
        </Wrapper>
    )
}

export default GridView
const Wrapper = styled.section`
display: grid;
@media (min-width:768px){
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
}

`
