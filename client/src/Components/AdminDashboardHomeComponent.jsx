import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Charts from './Charts'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 30vh;
    margin-top: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
    }
`
const ChartContainer = styled.div`
    /* margin-top:1rem; */
    width: 100%;
    flex:1;
`

const AdminDashboardHomeComponent = () => {
   const Data = [
    {
      name: "Jan",
      "Active User": 4000,
    },
    {
      name: "Feb",
      "Active User": 3000,
    },
    {
      name: "Mar",
      "Active User": 5000,
    },
    {
      name: "Apr",
      "Active User": 4000,
    },
    {
      name: "May",
      "Active User": 3000,
    },
    {
      name: "Jun",
      "Active User": 2000,
    },
    {
      name: "Jul",
      "Active User": 4000,
    },
    {
      name: "Agu",
      "Active User": 3000,
    },
    {
      name: "Sep",
      "Active User": 4000,
    },
    {
      name: "Oct",
      "Active User": 1000,
    },
    {
      name: "Nov",
      "Active User": 4000,
    },
    {
      name: "Dec",
      "Active User": 3000,
    },
  ];
  return (
    <Wrapper>
        <CardContainer>
          <Card cardTitle="Total Users" value={123} change={3} />
          <Card cardTitle="Total Hostels" value={500} change={+200} />
          <Card cardTitle="Total Engagement" value={50} change={-5} />
        </CardContainer>
        <ChartContainer>
          <Charts data={Data} title="User Analytics" grid dataKey="Active User"/>
        </ChartContainer>
    </Wrapper>
  )
}

export default AdminDashboardHomeComponent