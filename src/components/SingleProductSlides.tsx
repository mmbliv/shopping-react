import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from '@popmotion/popcorn'
import styled from 'styled-components'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import zIndex from "@mui/material/styles/zIndex";



type Props = {
    images: string[]
}


const variants = {
    enter: (direction: number) => {
        if (direction === 1) {
            return {
                x: -1000,
                opacity: 0
            }
        } else if (direction === -1) {
            return {
                x: 1000,
                opacity: 0
            }
        } else {
            return {
                opacity: 0
            }
        }

    },
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        if (direction === 1) {
            return {
                x: 1000,
                opacity: 0
            }
        } else if (direction === -1) {
            return {
                x: -1000,
                opacity: 0
            }
        } else {
            return {
                opacity: 0
            }
        }
    },
    showing: { scale: 1.2 },
    stopShowing: { scale: 1 }

};

export const SingleProductSlide: React.FC<Props> = ({ images }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);

    };

    const choosePage = (id: number) => {
        setPage([id, 2])

    }
    useEffect(() => {
        const imgInterval = setInterval(paginate, 5000, 1)
        return () => clearInterval(imgInterval)
    }, [page])

    return (
        <Wrapper className='section section-center'>
            <div className='img-container section-center'>

                <div className='container'>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={images[imageIndex]}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                        />
                    </AnimatePresence>
                    <div className='btns'>

                        <div className="next" onClick={() => paginate(1)}>
                            <SkipNextIcon />
                        </div>
                        <div className="prev" onClick={() => paginate(-1)}>
                            <SkipPreviousIcon />
                        </div>
                    </div>
                </div>
                <div className='small-img-container'>
                    <AnimatePresence initial={false}>
                        {images.slice(0, 4).map((img, index) => {
                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => choosePage(index)}
                                    whileHover={{ scale: 1.2 }}
                                    variants={variants}
                                    animate={`${index === imageIndex ? 'showing' : 'stopShowing'},center`}
                                    initial="enter"
                                    exit="exit"
                                >
                                    <img src={img} alt='img' className='small-img' />
                                </motion.button>
                            )
                        })}
                    </AnimatePresence>


                </div>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`


.img-container{
    
    background:black ;
}
.container{    
    position: relative;
    height: 300px;  
    overflow: hidden;
}
.btns{
    transition: var(--transition);
    opacity: 0;
    

}
img:hover+.btns{   
    opacity: 1;    
}
.btns:hover{
    opacity: 1;
}


/* .next:hover+.btns{
    opacity: 1;
} */
.next,
.prev { 
  top: calc(50% - 20px);
  position: absolute;
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
  

}

.next {
  right: 10px;
}

.prev {
  left: 10px;
 
}


img{  
    width: 100%;
    height: 100%;
    position: absolute;
    
   
}
.small-img{
    height: 80px;
    width: 80px;
    object-fit: cover;
    position: relative;
    border-radius: var(--radius);
}
.small-img-container{
    padding: 1rem 0;
   
    height: 110px;
    display: flex;
    justify-content:start;
    gap: 1rem;
    align-items: center;
    background:white;
}
button{
    border:none;
}
`
