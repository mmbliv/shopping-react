import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueFilterItem } from '../utils/helper'


const Filter = () => {
    const { filters, searchProducts, cleanFilter, all_products } = useFilterContext()
    const categoryItems = getUniqueFilterItem(all_products, 'category')
    const colorItems = getUniqueFilterItem(all_products, 'colors')
    const companyItems = getUniqueFilterItem(all_products, 'company')
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
                <label htmlFor=""><h4>Category</h4></label>
                <select name="category"
                    value={filters.category}
                    size={categoryItems.length}
                    className='category-select'
                // onChange={searchProducts}
                >
                    {categoryItems.map((item, index) => {
                        return (
                            <option key={index} value={item} >
                                {item}
                            </option>
                        )
                    })}
                </select>
            </form>
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


`
