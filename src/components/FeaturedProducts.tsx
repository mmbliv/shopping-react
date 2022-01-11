import React from 'react'
import { useProductsContext } from '../context/products_context'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import Product from "./Product"
import Loading from './Loading'

const FeaturedProducts = () => {

    const { products_loading: loading, featured_products: products, products_error: error } = useProductsContext()
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <h1>something went wrong...</h1>
    }
    return (
        <Wrapper className='section section-center'>
            <article className='title'>
                <h1>Featured Products</h1>
                <div className='underline'></div>
            </article>
            <Grid container className='container'>
                {products.slice(0, 3).map((item) => {
                    return (
                        <Grid item key={item.id} md={4} className='card'>
                            <Product key={item.id} {...item} />
                        </Grid>
                    )
                })}
            </Grid>

        </Wrapper>
    )
}

export default FeaturedProducts
const Wrapper = styled.section`
.card{    
    margin:0 auto;
}

.title{
    width: max-content;
    margin:1rem auto;
}


`
