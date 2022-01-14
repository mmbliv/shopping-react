import React, { useState } from 'react'
import styled from "styled-components"
import CheckIcon from '@mui/icons-material/Check'
import AmountBtn from './AmountBtn'
import { useCartContext } from '../context/cart_context'


type Props = {
    id: string;
    stock: number;
    colors: string[]
}


const AddToCart: React.FC<Props> = ({ colors, id, stock }) => {
    const { addCart } = useCartContext()
    const [mainColor, setMainColor] = useState(colors[0])
    const [itemCount, setItemCount] = useState(0)
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
            <br />
            <button className='btn' onClick={() => addCart(itemCount, mainColor, id)}>
                add to cart
            </button>
        </Wrapper>
    )
}

export default AddToCart
const Wrapper = styled.div`
display: grid;
width: max-content;



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




`
