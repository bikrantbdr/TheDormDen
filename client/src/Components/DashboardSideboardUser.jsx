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
                                Profile
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/user/edit">
                            <SidebarItemDiv >
                                <FaRegUser style={iconStyle} />
                                Edit Profile
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/user/changepassword">
                            <SidebarItemDiv >
                                <FaBed style={iconStyle} />
                                Change Password
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/user/reviews">
                            <SidebarItemDiv >
                                <FaBed style={iconStyle} />
                                Reviews
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
                                User Verification
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/hostelverification">
                            <SidebarItemDiv >
                                <FaHotel style={iconStyle} />
                                Hostel Verification
                            </SidebarItemDiv>
                        </SidebarListItem>
                        <SidebarListItem to="/admin/feedback">
                            <SidebarItemDiv >
                                <RiFeedbackLine style={iconStyle} />
                                Reviews
                            </SidebarItemDiv>
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
            </Container>
        </Wrapper>
    )
}

export default DashboardSidebarUser