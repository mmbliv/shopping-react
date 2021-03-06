import React from 'react'
import { productsType } from '../context/products_context'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { formatPrice } from '../utils/helper'
type Props = {
    products: productsType[]
}

const ListView: React.FC<Props> = ({ products }) => {
    return (
        <Wrapper>
            {products.map((product) => {
                return <div className='card' key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <footer>
                        <h5>{product.name}</h5>
                        <h5 className='price'>{formatPrice(product.price)}</h5>
                        <p>{product.description.substring(0, 200)}...</p>
                        <Link to={`/Product/${product.id}`} className='btn'>
                            details
                        </Link>

                    </footer>
                </div>

            })}
        </Wrapper>
    )
}

export default ListView
const Wrapper = styled.section`
display: grid;
gap: 3rem;
.price{
    color:var(--clr-primary-3)
}
footer{
    display: grid;
    gap: 0.6rem;
}
.btn{
    width: min-content;
}
img{
    height: 220px;
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius);
}
@media (min-width:768px){
    .card{
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        column-gap:2rem ;
        align-items: center;
    }
    
}


`
