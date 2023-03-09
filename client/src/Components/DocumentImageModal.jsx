<<<<<<< HEAD
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10; /* Sit on top */
    left: 0;
    top: 0;
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

export const Wrapper = styled.div`
    position: relative;
    background-color: #fefefe;
    margin: auto; /* 5% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: fit-content; /* Could be more or less, depending on screen size */

    &>img {
        max-width: 100%;
        max-height: 100%;
    }
`

export const CloseBtn = styled.span`
    background-color: crimson;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    color: #fff;
    font-size: 34px;
    font-weight: bold;
    position: absolute;
    z-index: 20;
    top: 10px;
    left: 1px;

    &:hover, &:focus {
        background-color: #999;
        text-decoration: none;
        cursor: pointer;
    }
`

const DocumentImageModal = ({ showModal, setShowModal, documentImage }) => {
    
  return (
    <ModalContainer>
        <Wrapper>
            <img src={documentImage || "https://coreldrawdesign.com/resources/previews/preview-error-404-page-not-found-page-vector-template-1629006906.jpg"} />
            <CloseBtn onClick={ () => setShowModal(false) }>&times;</CloseBtn>
        </Wrapper>
    </ModalContainer>
  )
}

=======
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10; /* Sit on top */
    left: 0;
    top: 0;
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

export const Wrapper = styled.div`
    position: relative;
    background-color: #fefefe;
    margin: auto; /* 5% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: fit-content; /* Could be more or less, depending on screen size */

    &>img {
        max-width: 100%;
        max-height: 100%;
    }
`

export const CloseBtn = styled.span`
    background-color: crimson;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    color: #fff;
    font-size: 34px;
    font-weight: bold;
    position: absolute;
    z-index: 20;
    top: 10px;
    left: 1px;

    &:hover, &:focus {
        background-color: #999;
        text-decoration: none;
        cursor: pointer;
    }
`

const DocumentImageModal = ({ showModal, setShowModal, documentImage }) => {
    
  return (
    <ModalContainer>
        <Wrapper>
            <img src={documentImage || "https://coreldrawdesign.com/resources/previews/preview-error-404-page-not-found-page-vector-template-1629006906.jpg"} />
            <CloseBtn onClick={ () => setShowModal(false) }>&times;</CloseBtn>
        </Wrapper>
    </ModalContainer>
  )
}

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
export default DocumentImageModal