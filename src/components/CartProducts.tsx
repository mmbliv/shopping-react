import React, { useState } from 'react'
import { productsType } from '../context/products_context'
import styled from 'styled-components'
import { formatPrice } from '../utils/helper'
import AmountBtn from './AmountBtn'
type Props = {
    products: productsType[]
}


const CartProducts: React.FC<Props> = ({ products }) => {

    const removeItem = () => {

    }
    const addItem = () => {

    }

    return (
        <Wrapper>
            {products.map((product) => {
                return <div key={product.id}>
                    <img src={product.image} alt="img" />
                    <div>
                        <p>{product.name}</p>
                        <p>Color:{product.choosed_color}</p>
                        <p>{formatPrice(product.price)}</p>
                    </div>
                    <AmountBtn removeItem={removeItem} addItem={addItem} itemCount={product.single_quantity!} />
                </div>

            })}
        </Wrapper>
    )
}

export default CartProducts
const Wrapper = styled.div`
`
