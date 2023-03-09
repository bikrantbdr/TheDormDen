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
import {BsStars} from "react-icons/bs"

import {RiFeedbackLine} from "react-icons/ri"

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

const DashboardSidebarAdmin = () => {

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
                        <SidebarListItem to="/admin">
                            <SidebarItemDiv >
                                <FaHome style={iconStyle} />
                                <SidebarItemText>Home</SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/featured">
                            <SidebarItemDiv >
                                <BsStars style={iconStyle} />
                                <SidebarItemText>Featured</SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/users">
                            <SidebarItemDiv >
                                <FaRegUser style={iconStyle} />
                                <SidebarItemText>Users</SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/hostels">
                            <SidebarItemDiv >
                                <FaBed style={iconStyle} />
                                <SidebarItemText>Hostels</SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>

                <SidebarMenu>
                    <SidebarTitle>Verification</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem to="/admin/userverification">
                            <SidebarItemDiv >
                                <FaUserCheck style={iconStyle} />
                                <SidebarItemText>
                                User Verification
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/hostelverification">
                            <SidebarItemDiv >
                                <FaHotel style={iconStyle} />
                                <SidebarItemText>
                                Hostel Verification
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/feedback">
                            <SidebarItemDiv >
                                <RiFeedbackLine style={iconStyle} />
                                <SidebarItemText>
                                Reviews
                                </SidebarItemText>
                            </SidebarItemDiv>
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
            </Container>
        </Wrapper>
    )
}

export default DashboardSidebarAdmin