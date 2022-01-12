import React, { useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueFilterItem } from '../utils/helper'
import CheckIcon from '@mui/icons-material/Check'

// import { getTheMaxPrice } from '../utils/helper'
import { formatPrice } from '../utils/helper'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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

    const [freeShipping, setFreeShipping] = useState(true)
    const chooseFreeShipping = (e: React.SyntheticEvent) => {
        setFreeShipping(!freeShipping)
        searchProducts(e)

    }


    return (
        <Wrapper>
            <form onSubmit={(e) => e.preventDefault()} >
                {/* input search filter */}
                <div className='input-control'>
                    <input
                        type="text"
                        name='search_text'
                        value={filters.search_text}
                        placeholder='search...'
                        onChange={searchProducts} />
                </div>
                {/* category search filter */}
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
                {/* company search filter */}
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
                {/* color search filter */}
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
                                    className={`color-all-btn ${mainColor === 'ALL' ? 'active' : null}`}

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
                {/* price search filter */}
                <div>
                    <h4>Price:</h4>
                    <h5>{formatPrice(filters.price)}</h5>
                    <input
                        max={filters.max_price}
                        min={filters.min_price}
                        // step={1}
                        value={filters.price}
                        name='price'
                        type='range'
                        onChange={searchProducts}
                    />
                </div>
                {/* free shipping or not filter */}
                <div>
                    <FormControlLabel
                        control={<Checkbox />}
                        label='Free Shipping'
                        value={freeShipping}
                        name='shipping'
                        onChange={chooseFreeShipping}
                    />
                </div>
            </form>
            {/* clear filter */}
            <div>
                <button className='btn' onClick={cleanFilter}>clear filter</button>
            </div>
        </Wrapper >
    )
}

export default Filter
const Wrapper = styled.section`
display: flex;
flex-direction: column;
gap: 1rem;
padding-top: 1rem;
width: 150px;

/* .category{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
} */
input{
    height: 2rem;
    font-size: 1rem;
    width: 100%;
}
h4{
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
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
    height: 1rem;
    width: 1rem;
    border:none;
    align-self: center;  
} 
.colors-container svg{
    color: white; 
    font-size: 1rem;
    /* font-weight:900; */
}
.color-all-btn{
    border:none;
   
    
}
.active{
    text-decoration: underline;

}

.colors-container{
    display: flex;
    align-items: center;
    gap:0.5rem
}

`
