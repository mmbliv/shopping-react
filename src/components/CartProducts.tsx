import React, { useState } from 'react'
import { productsType } from '../context/products_context'
import styled from 'styled-components'
import { formatPrice } from '../utils/helper'
import AmountBtn from './AmountBtn'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
type Props = {
    products: productsType[];
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
}


const CartProducts: React.FC<Props> = ({ products, addItem, removeItem }) => {



    return (
        <Wrapper className='section-center section'>
            {products.map((product) => {
                return <div key={product.id} className='cart-products'>
                    <div className='product-card'>
                        <img src={product.image} alt="img" />
                        <div className='card-footer'>

                            <h5>{product.name}</h5>
                            <p>Color:
                                <span style={{ background: product.choosed_color }} className='color'></span>
                            </p>
                            <h5 className='price'>{formatPrice(product.price)}</h5>
                        </div>
                    </div>
                    <AmountBtn removeItem={() => removeItem(product.id)} addItem={() => addItem(product.id)} itemCount={product.single_quantity!} />
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>

                </div>

            })}
        </Wrapper>
    )
}

export default CartProducts
const Wrapper = styled.section`
display: grid;
gap:1rem;
img{
height: 6rem;
width: 6rem;
border-radius: var(--radius);
object-fit: cover;
}
.product-card{
    display: grid;
    grid-template-columns:1fr 2fr;
    align-items: center;
    gap:1rem
}
span{
    width:1rem;
    height: 1rem;
    border-radius:50%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 1rem;
}
.price{
    color:var(--clr-primary-3)
}
.card-footer{
    gap:0.5rem;
    display: grid;
}
.cart-products{
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: center;
}

`
