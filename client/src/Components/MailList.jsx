import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 50px;
    width: 100%;
    background-color: #D179FF;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    gap: 10px;

    @media (max-width: 768px) {
        &>div {
            display: flex;
            flex-direction: column;
            width: 300px;
            gap: 5px;
        }
    }
`

const Input = styled.input`
    width: 300px;
    height: 40px;
    padding: 8px;
    margin-right: 10px;
`

const Button = styled.button`
    background-color: #A761CC;
    color: white;
    height: 40px;
    padding: 8px;
    border: none;
    cursor: pointer;
`


function MailList() {
  return (
    <Container>
        <h1>Save time, get the best!</h1>
        <span>Sign up and we'll send the best options to you</span>
        <div>
            <Input type="text" placeholder="Your email"/>
            <Button>Subscribe</Button>
        </div>
    </Container>
  )
}

export default MailList