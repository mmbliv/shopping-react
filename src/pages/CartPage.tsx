import React from "react";
import CartProducts from "../components/CartProducts";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartContext = useCartContext()


  return <Wrapper className="page-100">
    {cartContext.cart_products.length === 0 ?
      <div className="empty">
        <h1>The cart is empty</h1>
        <Link to='/products' className="btn">Back</Link>
      </div>

      : <CartProducts {...cartContext} />}

  </Wrapper>;
};

export default CartPage
const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
.empty{
  text-align: center;
  h1{
    margin-bottom: 2rem;
  }
}
h1{
  text-align: center;
  color:var(--clr-grey-2)
}

`
