
import styled from 'styled-components'

const Contact = () => {
    return (
        <Wrapper className='section-center section'>
            <article>

                <h3>Join our newsletter and get 20% off</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et voluptatibus tempora quasi hic dolorum iusto praesentium deleniti, sapiente natus eligendi blanditiis maiores earum repellat vel, veritatis quibusdam atque architecto distinctio.</p>
            </article>
            <form >
                <input type="email" placeholder='enter your email' />
                <button type="submit" className='btn'>submit</button>
            </form>
        </Wrapper>
    )
}

export default Contact
const Wrapper = styled.section`
margin-bottom: 5rem;
article{
    display: grid;
    gap:1rem
}
 p{
    width: 85%;
}
form{
    display: flex;
    justify-content: center;
   
}
input{
 border:2px solid var(--clr-black);
 width: 60%;
 text-indent: 1rem;
}
.btn{
    border:2px solid var(--clr-black);
    border-radius: 0%;
    border-left: none;
     
}

@media (min-width: 768px){
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
   
    
    
}


`
