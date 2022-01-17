import React, { useState } from 'react'
import styled from "styled-components"
import CheckIcon from '@mui/icons-material/Check'
import AmountBtn from './AmountBtn'
import { useCartContext } from '../context/cart_context'
import { motion, AnimatePresence } from 'framer-motion'
import { findItemsAddedToCart } from '../utils/helper'



type Props = {
    id: string;
    stock: number;
    colors: string[];
    imgUrls: string[];
    name: string
}


const AddToCart: React.FC<Props> = ({ colors, id, stock, imgUrls, name }) => {
    const { addCart } = useCartContext()
    const [mainColor, setMainColor] = useState(colors[0])
    const [itemCount, setItemCount] = useState(0)
    const { cart_products } = useCartContext()
    const removeItem = () => {
        if (itemCount > 0) {
            setItemCount(itemCount - 1)
        }
    }
    const addItem = () => {
        if (itemCount < stock) {
            setItemCount(itemCount + 1)
        }
    }
    const chooseColor = (color: string) => {
        setMainColor(color)
        setItemCount(0)
    }
    // use add as the key to control the animation of the added item
    const [add, setAdd] = useState(0)
    const clickBtnHandler = (itemCount: number, mainColor: string, id: string, stock: number) => {
        addCart(itemCount, mainColor, id, stock)
        const itemAmount = findItemsAddedToCart(cart_products, name)
        console.log(itemAmount)
        if (itemAmount! + itemCount < stock) {
            setAdd(add + 1)
        }

    }

    const imgMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [1, 0],
            x: 450,
            y: -800,
            transition: {
                duration: 1
            }
        },


    }
    return (
        <Wrapper>
            <p >
                <span>Colors: </span>
                <div className='colors-container'>
                    {colors.map((color, index) => {
                        return <button
                            key={index}
                            className='color-btn'
                            style={{ background: color }}
                            onClick={() => chooseColor(color)}
                        >
                            {mainColor === color ? <CheckIcon /> : null}
                        </button>

                    })}
                </div>
            </p>

            <AmountBtn addItem={addItem} removeItem={removeItem} itemCount={itemCount} />

            <button className='btn'
                onClick={() => clickBtnHandler(itemCount, mainColor, id, stock)}
                disabled={itemCount === 0}
            >
                <AnimatePresence initial={false}>
                    <motion.img
                        key={add}
                        src={imgUrls[0]}
                        className='sm-img'
                        variants={imgMotion}
                        initial='hidden'
                        animate='visible'

                    />
                </AnimatePresence>
                add to cart
            </button>
        </Wrapper>
    )
}

export default AddToCart
const Wrapper = styled.div`
display: grid;
width: max-content;
margin-top: 1rem;
gap:1rem;
.colors-container{
    display: flex;
    align-items: center;
    gap:1rem;    
}
 .color-btn{
    border-radius:50%;
    height: 1.5rem;
    width: 1.5rem;
    border:none;
    align-self: center;  
} 
.colors-container svg{
    color: white;    
}
.sm-img{
    height: 25px;
    width: 25px; 
    position: absolute;
    
}



`
