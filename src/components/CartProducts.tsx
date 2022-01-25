import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helper'
import AmountBtn from './AmountBtn'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { CartStateType } from '../context/cart_context'
import { useAuth0 } from '@auth0/auth0-react'



const CartProducts: React.FC<CartStateType> = ({ cart_products: products, addItem, removeItem, deleteProduct, clearCart, checkout_price, shipping }) => {

    const { isAuthenticated, loginWithRedirect } = useAuth0()

    return (

        <Wrapper className='section-center section'>
            <div className='cards-header'>
                <p>Item</p>

                <p>Quantity</p>
                <p>Subtotal</p>
                <p></p>

            </div>

            <hr />

            {products.map((product) => {
                return <div key={product.id} className='cart-products'>
                    <div className='product-card'>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.img} alt="img" />
                        </Link>
                        <div className='card-footer'>

                            <h5>{product.name}</h5>
                            <p>Color:
                                <span style={{ background: product.color }} className='color'></span>
                            </p>
                            <h5 className='price'>{formatPrice(product.price)}</h5>
                        </div>
                    </div>
                    <AmountBtn
                        removeItem={() => removeItem(product.id)}
                        addItem={() => addItem(product.id)}
                        itemCount={product.quantity!} />
                    <h5 className='price-single-total'>{formatPrice(product.price * product.quantity!)}</h5>
                    <IconButton onClick={() => deleteProduct(product.id)} className='icon-btn'>
                        <DeleteIcon />
                    </IconButton>

                </div>

            })}
            <hr />
            <div className='btns'>
                <Link to='/products'>
                    <button className='btn'>continue shopping</button>
                </Link>
                <button className='btn' onClick={clearCart}>clear shopping cart</button>
            </div>
            <div className='checkout-box'>

                <h5>Subtotal:
                    <span>{formatPrice(checkout_price)}</span>
                </h5>
                <h5>Shipping Fee:
                    <span>{formatPrice(534)}</span>
                </h5>
                <hr />
                <h5 className='total-price'>Order Total:
                    <span>{formatPrice(checkout_price + shipping)}</span>
                </h5>
            </div>
            {isAuthenticated ? <Link to='/checkout' className='login-btn'><button className='btn' >checkout</button></Link> :
                <button className='btn login-btn' onClick={loginWithRedirect}>login and checkout</button>}

        </Wrapper>
    )
}

export default CartProducts
const Wrapper = styled.section`
display: grid;
gap:3rem;
img{
height: 6rem;
width: 6rem;
border-radius: var(--radius);
object-fit: cover;
}
.cards-header{
    display: none;
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
.icon-btn{
    width: fit-content;
}
.price-single-total{
    display: none;
}
.btn{
    font-size: 1em;
}
.btns{
    display: flex;
    justify-content: space-between;
}
.checkout-box{   
    border:1px solid var(--clr-grey-5);
    padding: 1rem;   
    width: 500px;   
    margin:0 auto;
}
.checkout-box h5{
    display: grid;
    padding: 1rem;
    grid-template-columns:200px 1fr ;

}
.total-price{
    font-size: 1rem;
    color:var(--clr-primary-3)
}
.login-btn{
    width: max-content;
    margin:0 auto;
}
@media (min-width: 768px){
    .cart-products{
        grid-template-columns: 2fr 1fr 1fr 1fr;
    }
    .price-single-total{
        display:block;       
        text-align: center;
    }
    .cards-header{
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr ;
        text-align: center;
    }
    
}
`
