import React from "react";
import CartProducts from "../components/CartProducts";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";

const CartPage = () => {
  const { cart_products, addItem, removeItem, deleteProduct } = useCartContext()
  return <Wrapper className="page-100">
    <CartProducts products={cart_products} addItem={addItem} removeItem={removeItem} deleteProduct={deleteProduct} />
  </Wrapper>;
};

export default CartPage
const Wrapper = styled.section`

`
