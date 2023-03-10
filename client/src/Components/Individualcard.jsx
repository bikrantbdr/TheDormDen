
import React from 'react'
import styled from 'styled-components'
import {RiFacebookCircleFill} from 'react-icons/ri'
import {AiFillGithub} from 'react-icons/ai'
import {AiOutlineLinkedin} from 'react-icons/ai'


const StyledImg=styled.img`
    border-radius: 50%;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  padding: 0.5rem;
`

const Description=styled.p`
 padding: 1rem;   
`
const Styledcontainer=styled.div`
 display: inline-block;
  width: 22%;
  margin: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
 
`

export default function Individualcard(props) {
    const { name, qualification, otherInfo, imgSrc,flink,glink,llink } = props;
  return (
    <>
    <Styledcontainer>
    <StyledImg src={imgSrc} alt="Image description" class="circle-img" />
    <Description>
        <h2>{name}</h2>
        <h4>{qualification}</h4>
        <p>{otherInfo}</p>
        <br></br>
        <a href={flink} target="_blank" style={{ fontSize: '2em',textDecoration:'none',color:"black" }}><RiFacebookCircleFill/> </a>
        <a href={glink} target="_blank" style={{ fontSize: '2em',textDecoration:'none',color:"black" }}><AiFillGithub/> </a>
        <a href={llink} target="_blank" style={{ fontSize: '2em',textDecoration:'none',color:"black" }}><AiOutlineLinkedin/> </a>
    </Description>
    </Styledcontainer>
      
    </> 
  )
}
