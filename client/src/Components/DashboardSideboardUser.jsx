import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
    FaHome,
    FaRegUser,
    FaBed,
    FaUserCheck,
    FaHotel
} from "react-icons/fa";

import {RiLockPasswordLine} from "react-icons/ri"
import {MdOutlineRateReview} from "react-icons/md"

const Wrapper = styled.div`
    flex:1;
    height: 90vh;
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
    padding: 10px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #555;
`
const SidebarMenu = styled.div`
    margin-bottom: 10px;
`
const SidebarTitle = styled.div`
    font-size: 13px;
    color: rgb(187, 186, 186);
`
const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`
const SidebarListItem = styled(Link)`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    /* text-align: center; */
    /* justify-content: center; */
    text-decoration: none;
    color: #555;
    font-size: 1rem;
    border-radius: 10px;
    &:hover {
        background-color: rgb(240, 240, 255);
    }
`
const SidebarItemDiv = styled.div`
    display: flex;
    align-items: center;
`
const SidebarItemText = styled.div`
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const DashboardSidebarUser = ({user}) => {

    const iconStyle = {
        marginRight: "10px",
        fontSize: "20px",
    }
    return (
        <Wrapper>
            <Container>
                <SidebarMenu>
                    <SidebarTitle>Menu</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem to="/user">
                            <SidebarItemDiv >
                                <FaHome style={iconStyle} />
                                <SidebarItemText>Profile</SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/user/changepassword">
                            <SidebarItemDiv >
                                <RiLockPasswordLine style={iconStyle} />
                                <SidebarItemText>
                                Change Password
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/user/reviews">
                            <SidebarItemDiv >
                                <MdOutlineRateReview style={iconStyle} />
                                <SidebarItemText>
                                Reviews
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        
                        {user.hostel_listings !== null && user.hostel_listings.length > 0 &&
                        <SidebarListItem to="/user/hostels">
                            <SidebarItemDiv >
                                <FaBed style={iconStyle} />
                                <SidebarItemText>
                                Hostels
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        }
                        <SidebarListItem to="/user/register/hostel">
                            <SidebarItemDiv >
                                <FaHotel style={iconStyle} />
                                <SidebarItemText>
                                Register a Hostel
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
            </Container>
        </Wrapper>
    )
}

export default DashboardSidebarUser