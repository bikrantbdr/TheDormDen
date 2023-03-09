import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import HostelDescription from './HostelDescription';
import HostelAmenities from './HostelAmenities';
import HostelReviewsAndComments from './HostelReviewsAndComments';

const Wrapper = styled.div`
    margin-top: 24px;
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &>h1 {
        font-size: 1.6rem;
    }

    &>h2 {
        font-size: 1rem;
    }

    &>p {
        font-size: 0.8rem;
        color: #b7bac6;
    }

    @media (max-width: 768px) {
        padding: 0 16px;

        &>h1 {
            font-size: 1.2rem;
        }

        &>h2 {
            font-size: 0.8rem;
        }

        &>p {
            font-size: 0.6rem;
        }
    }
`

const TabsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 24px;

    color: #838990;
    font-weight: bold;
    padding-bottom: 8px;
    border-bottom: 1.5px solid #eaedec;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        justify-content: flex-start;
        gap: 16px;
    }
`

const ActiveTab = styled.div`
    cursor: pointer;
    color: #d179ff;
    position: relative;

    &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -9px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #d179ff;
    }
`

const Tabs = styled.div`
    display: flex;
    gap: 46px;

    &>p {
        cursor: pointer;
        position: relative;
    }

    &>p:hover {
        color: #d179ff;
    }

    &>p:hover::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -9px;
        /* left: ; */
        width: 100%;
        height: 2px;
        background-color: #d179ff;
    }
`


const HostelDetails = ({ hostelInfo }) => {
    const [openDescriptionOption, setOpenDescriptionOption] = useState(false);
    const [openOfferOption, setOpenOfferOption] = useState(false);
    const [openReviewOption, setOpenReviewOption] = useState(true);

    const [hostelAddress, setHostelAddress] = useState("");

    useEffect(() => {
        const API_KEY = "769f09ef503a44d1bcb4218675c23b0c";
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${hostelInfo.location.coordinates[1]}&lon=${hostelInfo.location.coordinates[0]}&format=json&apiKey=${API_KEY}`)
            .then((res) => {
                setHostelAddress(`${res.data.results[0].street}, ${res.data.results[0].city}, ${res.data.results[0].country}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [hostelInfo])


    const handleActiveTab = (toSetActive) => {
        if (toSetActive === "d") {
            setOpenDescriptionOption(true);
            setOpenOfferOption(false);
            setOpenReviewOption(false);
        } else if (toSetActive === "w") {
            setOpenDescriptionOption(false);
            setOpenOfferOption(true);
            setOpenReviewOption(false);
        } else if (toSetActive === "r") {
            setOpenDescriptionOption(false);
            setOpenOfferOption(false);
            setOpenReviewOption(true);
        }
    }

  return (
    <Wrapper>
        <h1>{hostelInfo.name}</h1>
        {/* <h2>{hostelAddress}</h2> */}
        <p>{hostelInfo.amenities[0]} • {hostelInfo.amenities[1]} • {hostelInfo.amenities[2]} • {hostelInfo.amenities[3]}</p>
        <TabsWrapper>
            <Tabs>
                {openDescriptionOption ? <ActiveTab>Description</ActiveTab> : <p onClick={ () => handleActiveTab("d") }>Description</p>}
                {openOfferOption ? <ActiveTab>What we offer</ActiveTab> : <p onClick={ () => handleActiveTab("w") }>What we offer</p>}
                {openReviewOption ? <ActiveTab>Reviews</ActiveTab> : <p onClick={ () => handleActiveTab("r") }>Reviews</p>}
            </Tabs>
            <p>Published { new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(hostelInfo.createdAt)) }</p>
        </TabsWrapper>
        {openDescriptionOption && <HostelDescription hostelInfo={ hostelInfo }/>}
        {openOfferOption && <HostelAmenities hostelInfo={ hostelInfo }/>}
        {openReviewOption && <HostelReviewsAndComments hostelInfo={ hostelInfo }/>}
    </Wrapper>
  )
}

export default HostelDetails