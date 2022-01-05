import React from 'react'
import ViewComfyAltOutlinedIcon from '@mui/icons-material/ViewComfyAltOutlined'
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import { useFilterContext } from '../context/filter_context'

const Sort = () => {
    const { setGridView, setListView, grid_view, filter_products, sort, setSort } = useFilterContext()
    return (
        <Wrapper>
            <div className='btn-container'>
                <IconButton onClick={setGridView} >
                    <ViewComfyAltOutlinedIcon color={grid_view ? 'action' : 'disabled'} />
                </IconButton>
                <IconButton onClick={setListView}>
                    <CalendarViewWeekOutlinedIcon color={grid_view ? 'disabled' : 'action'} />
                </IconButton>

            </div>
            <h5>{filter_products.length} Proucts Found</h5>
            <hr />
            <form action="">
                <label htmlFor="sort">Sort By</label>
                <select name="sort" id="sort" value={sort} onChange={setSort}>
                    <option value="price-lowest">Price (Lowest)</option>
                    <option value="price-highest">Price (Highest)</option>
                    <option value="name-a">Name (A-Z)</option>
                    <option value="name-z">Name (Z-A)</option>

                </select>
            </form>

        </Wrapper>
    )
}

export default Sort
const Wrapper = styled.section`

display: grid;

margin-bottom: 2rem;

gap:1rem;

svg{
    font-size: 2em;
    
}
form{
    display: flex;
    gap:1rem;
    font-size: 1rem;
   
}

select{
    border:none;
    font-size: 1rem;
}


@media (min-width:768px){
    
    grid-template-columns:auto auto 1fr auto ;
    align-items: center;
   
    
}

`
