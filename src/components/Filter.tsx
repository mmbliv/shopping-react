import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'

const Filter = () => {
    const { filters, searchProducts, cleanFilter } = useFilterContext()
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
        </Wrapper >
    )
}

export default Filter
const Wrapper = styled.section`


`
