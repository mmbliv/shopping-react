import React, { useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueFilterItem } from '../utils/helper'
import CheckIcon from '@mui/icons-material/Check'


const Filter = () => {
    const { filters, searchProducts, cleanFilter, all_products } = useFilterContext()
    const categoryItems = getUniqueFilterItem(all_products, 'category')
    const colorItems = getUniqueFilterItem(all_products, 'colors')
    const companyItems = getUniqueFilterItem(all_products, 'company')
    const [mainColor, setMainColor] = useState(colorItems[0])
    const chooseColor = (color: string, e: React.SyntheticEvent) => {
        setMainColor(color)
        searchProducts(e)

    }
    return (
        <Wrapper>
            <form onSubmit={(e) => e.preventDefault()} >
                <div className='input-control'>
                    <input
                        type="text"
                        name='search_text'
                        value={filters.search_text}
                        placeholder='search...'
                        onChange={searchProducts} />
                </div>
            </form>

            <form className='category'>
                <label ><h4>Category</h4></label>
                <select
                    name="category"
                    value={filters.category}
                    size={categoryItems.length}
                    className='category-select'
                    onChange={searchProducts}
                >
                    {categoryItems.map((item, index) => {
                        return (
                            <option key={index} value={item} className='category-option'>
                                {item}
                            </option>
                        )
                    })}
                </select>
            </form>
            <form>
                <label><h4>Company</h4></label>
                <select
                    name="company"
                    id="company"
                    value={filters.company}
                    className='company-select'
                    onChange={searchProducts}
                >
                    {companyItems.map((item, index) => {
                        return (
                            <option value={item} key={index}>{
                                item}</option>
                        )

                    })}

                </select>

            </form>
            <div >
                <h4>Colors: </h4>
                <div className='colors-container'>
                    {colorItems.map((color, index) => {
                        if (color === 'ALL') {
                            return <button
                                key={index}
                                onClick={(e) => chooseColor(color, e)}
                                name='color'
                                value={color}

                            >{color}</button>
                        }

                        return <button
                            key={index}
                            className='color-btn'
                            style={{ background: color }}
                            name='color'
                            value={color}
                            onClick={(e) => chooseColor(color, e)}
                        >
                            {mainColor === color ? <CheckIcon /> : null}
                        </button>

                    })}
                </div>
            </div>
        </Wrapper >
    )
}

export default Filter
const Wrapper = styled.section`
display: flex;
flex-direction: column;
gap: 1rem;

.category{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.category-select{
    border:none;
    width: max-content; 
    padding :0 5px ;
}
select{  
    outline: none;
}

.category-option:checked{
    text-decoration: underline;
    box-shadow: 0 0 10px 100px #FFF inset; 
   
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
