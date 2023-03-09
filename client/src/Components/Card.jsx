import React from 'react'
import styled from 'styled-components'
import {FaArrowUp, FaArrowDown} from 'react-icons/fa'

const Container = styled.div`
    flex : 1;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    transition: all 0.3s ease-in-out;
    &:hover{
        transform: scale(1.05);
    }

    @media screen and (max-width: 768px) {
        margin: 0.5rem;
        height:20vh;
        width: 80%;
    }
`
const CardTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
`
const ValueContainer = styled.div`
    margin: 2rem 0px;
    display: flex;
    align-items: center;
`
const CardValue = styled.div`
    font-size: 2rem;
    font-weight: 600;
`
const Change = styled.div`
    padding-left: 1.5rem;
`

const Card = ({cardTitle,value,change}) => {
  return (
    <Container>
        <CardTitle>{cardTitle}</CardTitle>
        <ValueContainer>
            <CardValue>{value}</CardValue>
            <Change>{change} {change > 0 ? <FaArrowUp color="green"/> : <FaArrowDown color="red"/>}
            </Change>
        </ValueContainer>
    </Container>
  )
}

export default Card