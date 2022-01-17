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
    console.log(itemCount)
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
    const [disableBtn, setDisableBtn] = useState(false)
    const [noMoreStock, setNoMoreStock] = useState(false)
    const [add, setAdd] = useState(0)
    const clickBtnHandler = (itemCount: number, mainColor: string, id: string, stock: number) => {
        addCart(itemCount, mainColor, id, stock)
        const itemAmount = findItemsAddedToCart(cart_products, name)
        if (!itemAmount && (itemCount <= stock) && itemCount !== 0) {
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
            {noMoreStock && <h5 id='reminder'>No more stock for this product</h5>}
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
