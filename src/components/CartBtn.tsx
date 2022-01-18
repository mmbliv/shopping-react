
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';


const CartBtn = () => {
    const { total_quantity } = useCartContext()
    return (
        <IconButton>
            <Badge badgeContent={total_quantity}>
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


