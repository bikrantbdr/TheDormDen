import React from 'react'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { PromptContext } from '../context/PromptContext';


function PromptBar() {
    const { display, message, status, purpose, dispatch } = useContext(PromptContext);
    
    const PromptWrapper = styled.div`
        background-color: ${purpose === 'warning' ? '#ffe5b4' : '#f8d7da'};
        color: ${purpose === 'warning' ? '#856404' : '#b90e0a'};
        padding: 16px 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        font-size: 1rem;
        font-weight: bold;
    `;

    const AcceptButton = styled.button`
        background-color: #28a745;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
    `

    const RejectButton = styled.button`
        background-color: #dc3545;  
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
    `
  
    return display ? (
      <PromptWrapper>
        <span>{message}</span>
        <AcceptButton>Yes</AcceptButton>
        <RejectButton onClick={ () => dispatch({type: 'PROMPT_END'})}>No</RejectButton>
      </PromptWrapper>
    ) : null;
  }

export default PromptBar