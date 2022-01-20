import React, { useEffect } from "react";
import { useParams } from "react-router";
import { single_product_url } from "../utils/constant";
import { useProductsContext } from "../context/products_context";
import Loading from "../components/Loading";
import { SingleProductSlide } from "../components/SingleProductSlides";
import ProductInfor from "../components/ProductInfor";
import styled from 'styled-components';



const SingleProductPage = () => {

  const { fetchSingleProduct, single_product: product, single_product_error: error, single_product_loading: loading } = useProductsContext()
  const { id } = useParams()
  const { imgUrls } = product



  useEffect(() => {
    fetchSingleProduct(single_product_url + id)
  }, [id])



  if (loading) {
    return <Loading />
  }
  if (error) {
    return <h1>something went wrong </h1>
  }
  return <Wrapper className='section section-center page-100'>
    <SingleProductSlide images={imgUrls} />
    <ProductInfor {...product} />
  </Wrapper>;
};

export default SingleProductPage;
const Wrapper = styled.section`
display: grid;
@media (min-width: 992px){
  grid-template-columns: 1fr 1fr;
  gap:3rem;
 
}


`
