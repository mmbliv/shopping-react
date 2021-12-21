import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { single_product_url } from "../utils/constant";
import { useProductsContext } from "../context/products_context";
import Loading from "../components/Loading";
import { SingleProductSlide } from "../components/SingleProductSlides";



const SingleProductPage = () => {
  const [imgs, setImgs] = useState([''])
  const { fetchSingleProduct, single_product: product, single_product_error: error, single_product_loading: loading } = useProductsContext()
  const { id } = useParams()
  const { name, price, description, stock, review, id: sku, company, imgUrls } = product

  console.log(imgUrls)
  useEffect(() => {
    fetchSingleProduct(single_product_url + id)
  }, [id])



  if (loading) {
    return <Loading />
  }
  if (error) {
    return <h1>something went wrong </h1>
  }
  return <div>
    <SingleProductSlide images={imgUrls} />
  </div>;
};

export default SingleProductPage;
