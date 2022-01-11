import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import styled from 'styled-components'
type Props = {
    removeItem: () => void;
    addItem: () => void;
    itemCount: number
}

const AmountBtn: React.FC<Props> = ({ removeItem, addItem, itemCount }) => {
    return (
        <Wrapper >
            <IconButton onClick={removeItem}>
                <RemoveIcon />
            </IconButton>
            <div>
                {itemCount}
            </div>
            <IconButton onClick={addItem}>
                <AddIcon />
            </IconButton>
        </Wrapper>
    )
}

export default AmountBtn
const Wrapper = styled.div`

    display: grid;
    align-items: center;
    /* gap:2rem; */
    font-size: x-large;
    font-weight:800;
    /* width: 100%; */
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
   
    div{      
        text-align: center;
    }

`
