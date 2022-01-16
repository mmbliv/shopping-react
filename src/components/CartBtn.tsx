import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';
import { calculateTotalQuantity } from '../utils/helper';

const CartBtn = () => {
    const { cart_products } = useCartContext()
    return (
        <IconButton>
            <Badge badgeContent={calculateTotalQuantity(cart_products)}>
                <Link to='/cart'>
                    <StyledIcon />
                </Link>
            </Badge>
        </IconButton>
    )
}

export default CartBtn

const StyledIcon = styled(ShoppingCartIcon)`
color: var(--clr-primary-1);

`


