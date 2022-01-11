import React from "react";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import styled from 'styled-components'

const ProductsPage = () => {

  return <Wrapper >
    <div className='section-center products'>
      <Filter />
      <div >
        <Sort />
        <ProductList />
      </div>
    </div>
  </Wrapper>;
};

export default ProductsPage;
const Wrapper = styled.main`
.products{
  display: grid;
  gap:3rem 1.5rem;
  margin:4rem auto;
  
  
}
@media (min-width:768px){
  .products{
    grid-template-columns: 200px 1fr;

  }
}

  
`
