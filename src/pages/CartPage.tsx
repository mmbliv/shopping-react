import React from "react";
import CartProducts from "../components/CartProducts";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";

const CartPage = () => {
  const { cart_products } = useCartContext()
  return <Wrapper>
    <CartProducts products={cart_products} />
  </Wrapper>;
};

export default CartPage;
const Wrapper = styled.section`

`
