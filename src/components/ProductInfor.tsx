import React from 'react'
import styled from 'styled-components'
import { singleProductType } from '../context/products_context'
import Stars from './Stars'
import { formatPrice } from '../utils/helper'
import AddToCart from './AddToCart'

const ProductInfor: React.FC<singleProductType> = ({ name, price, description, stock, stars, reviews, id, company, colors }) => {

    return (
        <Wrapper className='section' >
            <div className='header'>
                <h2>{name}</h2>
                <Stars stars={stars} review={reviews} />
                {/* <br /> */}
                <h5 className='price'>{formatPrice(price)}</h5>
                <p>{description}</p>
            </div>
            <div className='info'>

                <p>
                    <span>Available: </span>
                    {stock > 0 ? 'In stock' : 'Out of shock'}
                </p>
                <p>
                    <span>SKU: </span>
                    {id}
                </p>
                <p>
                    <span>Brand: </span>
                    {company}
                </p>
                <hr />
                <br />
                {stock > 0 && <AddToCart id={id} stock={stock} colors={colors} />}
            </div>
        </Wrapper>
    )
}

export default ProductInfor
const Wrapper = styled.section`
.header{
    display: grid;
    gap:1rem
}
.info p{
    display : grid;
    grid-template-columns: 125px 1fr;
}
.price{
    color:var(--clr-primary-3)
}
span {
  font-weight: 700;
}
`
