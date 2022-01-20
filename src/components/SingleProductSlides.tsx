import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from '@popmotion/popcorn'
import styled from 'styled-components'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'



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
    // control the big slides
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);

    };
    //  choosePage func take two arguments, the first one is the index of every small slide, so the big slide div can show the 
    //  choosed small slide.the seconde one is the position id of the four small slides, which is used to place the slides show 
    // the right place.Also this func need to set the is need to change controller and the preDirection controller at the original
    // place.Even thought the "false" and "0" is not the original set?????? 

    const choosePage = (id: number, smPage: number) => {
        setPage([id, 2])
        setSmPage(smPage)
        setIsNeedChange(false)
        setPreImgDirection(0)
    }
    // those control the four small div
    const [smPageA, setSmPageA] = useState(0);
    const [smPageC, setSmPageC] = useState(2);
    const [smPageD, setSmPageD] = useState(3);
    const [smPageB, setSmPageB] = useState(1);
    const smImgIndexA = wrap(0, images.length, smPageA)
    const smImgIndexB = wrap(0, images.length, smPageB)
    const smImgIndexC = wrap(0, images.length, smPageC)
    const smImgIndexD = wrap(0, images.length, smPageD)
    const [preImgDirection, setPreImgDirection] = useState(-1)
    const [isNeedChange, setIsNeedChange] = useState(true)
    // this control the show turn: every small div has a fixed id(1-4)
    const [smPage, setSmPage] = useState(1)
    const smImageIndex = wrap(1, 5, smPage);


    const smImgPaginate = (direction: number) => {
        setPreImgDirection(direction)
        if (smImageIndex === 1 && direction === -1) {
            setIsNeedChange(true)
            setSmPageA(smPageA + direction)
            setSmPageB(smPageB + direction)
            setSmPageC(smPageC + direction)
            setSmPageD(smPageD + direction)

        } else if (smImageIndex === 4 && direction === 1) {
            setIsNeedChange(true)
            setSmPageA(smPageA + direction)
            setSmPageB(smPageB + direction)
            setSmPageC(smPageC + direction)
            setSmPageD(smPageD + direction)

        } else if (isNeedChange && preImgDirection === direction) {
            setSmPageA(smPageA + direction)
            setSmPageB(smPageB + direction)
            setSmPageC(smPageC + direction)
            setSmPageD(smPageD + direction)
        } else {
            setSmPage(smPage + direction)
        }
        if (preImgDirection !== direction) {
            setIsNeedChange(false)

        }


    }


    const nextBtn = () => {
        setPreImgDirection(1)
        paginate(1);
        smImgPaginate(1)
    }
    const preBtn = () => {
        setPreImgDirection(-1)
        paginate(-1);
        smImgPaginate(-1)
    }

    // useEffect(() => {
    //     const imgInterval = setInterval(nextBtn, 1000)
    //     return () => clearInterval(imgInterval)
    // }, [page])

    return (
        <Wrapper className='section section-center'>
            <div className='img-container'>

                <div className='main-img-container'>
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

                        <div className="next" onClick={() => nextBtn()}>
                            <SkipNextIcon />
                        </div>
                        <div className="prev" onClick={() => preBtn()}>
                            <SkipPreviousIcon />
                        </div>
                    </div>
                </div>
                <div className='small-img-container'>
                    <motion.div
                        id='sm-container'
                        whileHover={{ scale: 1.2 }}
                        variants={variants}
                        animate={imageIndex === smImgIndexA ? 'showing' : 'stopShowing'}
                    >

                        <AnimatePresence initial={false} custom={direction}>
                            <motion.button
                                id='smimg'
                                key={smPageA}

                                custom={direction}
                                variants={variants}
                                animate='center'
                                initial="enter"
                                onClick={() => choosePage(smImgIndexA, 1)}
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }} >
                                <img src={images[smImgIndexA]} alt="img" />
                            </motion.button>


                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        id='sm-container'
                        whileHover={{ scale: 1.2 }}
                        variants={variants}
                        animate={imageIndex === smImgIndexB ? 'showing' : 'stopShowing'}>

                        <AnimatePresence>

                            <motion.button
                                id='smimg'
                                key={smPageB}

                                custom={direction}
                                variants={variants}
                                animate='center'
                                initial="enter"
                                onClick={() => choosePage(smImgIndexB, 2)}
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}>
                                <img src={images[smImgIndexB]} alt="img" />
                            </motion.button>
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        id='sm-container'
                        whileHover={{ scale: 1.2 }}
                        variants={variants}
                        animate={imageIndex === smImgIndexC ? 'showing' : 'stopShowing'}>

                        <AnimatePresence>

                            <motion.button
                                id='smimg'
                                key={smPageC}

                                custom={direction}
                                variants={variants}
                                animate='center'
                                initial="enter"
                                onClick={() => choosePage(smImgIndexC, 3)}
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}>
                                <img src={images[smImgIndexC]} alt="img" />
                            </motion.button>
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        id='sm-container'
                        whileHover={{ scale: 1.2 }}
                        variants={variants}
                        animate={imageIndex === smImgIndexD ? 'showing' : 'stopShowing'}>

                        <AnimatePresence>
                            <motion.button
                                id='smimg'
                                key={smPageD}

                                custom={direction}
                                variants={variants}
                                animate='center'
                                initial="enter"
                                onClick={() => choosePage(smImgIndexD, 4)}
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}>
                                <img src={images[smImgIndexD]} alt="img" />
                            </motion.button>
                        </AnimatePresence>
                    </motion.div>

                    {/* {images.slice(smImgIndex * 4, smImgIndex * 4 + 4).map((img, index) => {
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
                        })} */}



                </div>
            </div>
        </Wrapper >
    );
};
const Wrapper = styled.div`



.main-img-container{    
    position: relative;
    height: 300px;  
    overflow: hidden; 

    background:black ;
    border-radius: var(--radius);
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


.main-img-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;   
   
}
.small-img-container img{  
    height: 80px;
    width: 100px;
    /* object-fit:cover; */
    /* position: absolute;*/
   
}
.small-img-container{
    /* padding: 1rem 0;  */
    height: 110px;   
    display: flex;
    justify-content:space-around;      
    align-items: center;
    background:white;

    
    
    
}
#sm-container{
    position: relative;
    overflow: hidden;
    height: 80px;
    width: 90px;
    /* object-fit:cover; */
    
    
}
#smimg{
    position: absolute;
    object-fit:cover;
    
}
button{
    border:none;
    
}
img{
    border-radius: var(--radius);
    
}
@media (min-width: 992px){
    width: 100%;
    #sm-container{
        width: 110px;
    }
}
`
