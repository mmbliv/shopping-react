import React, { useState } from 'react'
import styled from "styled-components"
import CheckIcon from '@mui/icons-material/Check'
import AmountBtn from './AmountBtn'
import { useCartContext } from '../context/cart_context'
import { motion, AnimatePresence } from 'framer-motion'
import { findItemsAddedToCart } from '../utils/helper'
import { singleProductType } from '../context/products_context'


const AddToCart: React.FC<singleProductType> = (product) => {
    const { colors, id, stock, imgUrls } = product
    const { addCart, cart_products } = useCartContext()
    const [mainColor, setMainColor] = useState(colors[0])
    const [itemCount, setItemCount] = useState(0)


    const removeItem = () => {
        if (itemCount > 0) {
            setItemCount(itemCount - 1)
            setNoMoreStock(false)
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
        setNoMoreStock(false)
    }
    // use add as the key to control the animation of the added item
    const [disableBtn, setDisableBtn] = useState(false)
    const [noMoreStock, setNoMoreStock] = useState(false)
    const [add, setAdd] = useState(0)
    const clickBtnHandler = () => {
        addCart(itemCount, mainColor, product)
        const itemAmount = findItemsAddedToCart(cart_products, mainColor, id)
        if (!itemAmount && (itemCount < stock) && itemCount !== 0) {
            setAdd(add + 1)
            setNoMoreStock(false)
        }
        if (itemAmount && (itemCount + itemAmount < stock) && itemCount !== 0) {
            setAdd(add + 1)
            setNoMoreStock(false)
        }
        if ((!itemAmount && (itemCount >= stock)) || (itemAmount && (itemCount + itemAmount >= stock))) {
            setNoMoreStock(true)
        }
        if (itemCount === 0) {
            setDisableBtn(true)
            setNoMoreStock(false)
        } else {
            setDisableBtn(false)
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
            <div className='add-cart'>

                <p >
                    <span>Colors: </span>
                    <span className='colors-container'>
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
                    </span>
                </p>

                <AmountBtn addItem={addItem} removeItem={removeItem} itemCount={itemCount} />

                <button className='btn'
                    onClick={() => clickBtnHandler()}
                // disabled={disableBtn}
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
            </div>
            {disableBtn && <h5 id='reminder'>Please choose product first</h5>}
            {noMoreStock && <h5 id='reminder'>Only {stock} left for this product</h5>}
        </Wrapper>
    )
}

export default AddToCart
const Wrapper = styled.div`
.add-cart{
    display: grid;
    width: max-content;
    margin-top: 1rem;
    gap:1rem;
}
#reminder{
    margin-top:1rem ;
}
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
