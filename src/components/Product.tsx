import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { formatPrice } from '../utils/helper';

type Props = {
    image: string;
    name: string;
    price: number;
    id: number
}

const Product: React.FC<Props> = ({ image, name, price, id }) => {
    return (
        <Wrapper >
            <div >
                <motion.div className='img' whileHover={{ opacity: 0.8 }}>
                    <Link to={`/product/${id}`}>
                        <img src={image} alt="img" />
                    </Link>
                </motion.div>
                <footer>
                    <h5>{name}</h5>
                    <p>{formatPrice(price)}</p>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Product
const Wrapper = styled.div`
height: 350px;
display: flex;
align-items: center;

img{
    height:250px; 
    width: 90vw;
    border-radius: var(--radius);  
    object-fit: cover;
    background-color:var(--clr-black) ;
    
}
@media (min-width: 768px){
    width: 300px;
    margin-left:auto;
    margin-right: auto;
    
    
    img{
        width: 300px;
    }
}
`
