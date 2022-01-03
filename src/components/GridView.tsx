
import React from 'react'
import { productsType } from '../context/products_context'
import styled from 'styled-components'
import { formatPrice } from '../utils/helper'
import { Link } from "react-router-dom"
type props = {
    products: productsType[]
}

const GridView: React.FC<props> = ({ products }) => {
    return (
        <Wrapper className='section'>
            {products.map((product) => {
                return <Link to={`/Product/${product.id}`} key={product.id} className='card'>
                    <img src={product.image} alt={product.name} />
                    <div className='footer'>
                        <h5>{product.name}</h5>
                        <h5>{formatPrice(product.price)}</h5>
                    </div>
                </Link>
            })}
        </Wrapper>
    )
}

export default GridView
const Wrapper = styled.section`
display: grid;
img{
    height: 70%;
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius);
}
.card{
    height: 300px;
}
.footer{
    display: flex;
    justify-content: space-between;
    font-size: 1em;
}
h5:nth-child(2){
    color: var(--clr-primary-4);
}
@media (min-width:768px){
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
}

`
