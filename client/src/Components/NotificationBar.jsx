import React from 'react'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { BsFillXCircleFill } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { NotificationContext } from '../context/NotificationContext';


function NotificationBar({ duration = 3000 }) {
    const { display, message, status, dispatch } = useContext(NotificationContext);
    
    const NotificationBarWrapper = styled.div`
        background-color: ${status === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${status === 'success' ? '#3cb043' : '#b90e0a'};
        padding: 16px 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        font-size: 1rem;
        font-weight: bold;
    `;
  
    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch({ type: 'NOTIFICATION_END' });
      }, duration);
      return () => clearTimeout(timer);
    }, [display]);
  
    return display ? (
      <NotificationBarWrapper>
        <span>{message}</span> { status === 'success' ? <BsFillCheckCircleFill color='#3cb043'/> : <BsFillXCircleFill color='#b90e0a'/>}
      </NotificationBarWrapper>
    ) : null;
  }

export default NotificationBar