import React from "react";
import CartProducts from "../components/CartProducts";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";

const CartPage = () => {
  const cartContext = useCartContext()


  return <Wrapper className="page-100">
    {cartContext.cart_products.length === 0 ? <h1>The cart is empty</h1> : <CartProducts {...cartContext} />}

  </Wrapper>;
};

export default CartPage
const Wrapper = styled.section`
h1{
  text-align: center;
  color:var(--clr-grey-5)
}

`
