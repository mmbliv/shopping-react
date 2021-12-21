import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const CartBtn = () => {
    return (
        <IconButton>
            <Badge badgeContent='6'>
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


