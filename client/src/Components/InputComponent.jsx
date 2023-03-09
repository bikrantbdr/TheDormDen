import React from 'react'
import { useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;

    &>input {
        width: 100%;
        font-weight: bold;
        padding: 8px 12px;
        border-radius: 4px;
        letter-spacing: 0.05rem;
        background-color: #f3f3f3;
        border: 1.5px solid #eeeeee;
    }

    &>input:focus {
        outline: none;
        background-color: #fff;
    }
`

const ErrorSpan = styled.span`
    display: none;
    text-align: right;
    font-style: italic;
    font-size: 0.8rem;
    margin-top: 3px;
    padding: 3px;
    color: hsl(0, 100%, 74%);

    input:invalid[focused="true"] ~ & {
        display: block;
    }
`

const InputComponent = ({ label, errorMessage, onChange, ...inputProps }) => {
    const [focused, setFocused] = useState(false)
  return (
    <Container>
        <input { ...inputProps } onChange={ onChange } onBlur={ (e) => {setFocused(true)} } focused={focused.toString()} />
        <ErrorSpan>{ errorMessage }</ErrorSpan>
    </Container>
  )
}

export default InputComponent