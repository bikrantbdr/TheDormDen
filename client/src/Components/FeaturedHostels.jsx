import React from 'react'
import styled from 'styled-components'
import { useFetch } from './../hooks/useFetch';

const Container = styled.div`
    width: 100%;
    max-width: 934px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
        overflow-x: scroll;
        padding: 0 20px;
    }
`

const FeaturedItem = styled.div`
    flex: 1;
    position: relative;
    color: white;
    border-radius: 8px;
    height: 250px;
    overflow: hidden;
    z-index: 1;

    @media (max-width: 768px) {
        flex: 0 0 300px;
    }
`

const FeaturedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const FeaturedTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    bottom: 20px;
    left: 16px;
    z-index: 1;
`

function FeaturedHostels() {
    const { data, loading, error } = useFetch("http://localhost:5000/api/hostels/featured")

  return (
    <Container>
        {loading? "Loading please wait" : <><FeaturedItem>
            <FeaturedImage src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
            <FeaturedTitle>
                {/* <h1>{data[0].name}</h1> */}
                <h3>Thapathali, Kathmandu</h3>
            </FeaturedTitle>
        </FeaturedItem>

        <FeaturedItem>
            <FeaturedImage src="https://images.unsplash.com/photo-1557335200-a65f7f032602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"/>
            <FeaturedTitle>
                {/* <h1>{data[1].name || "none"}</h1> */}
                <h3>Thapathali, Kathmandu</h3>
            </FeaturedTitle>
        </FeaturedItem>

        <FeaturedItem>
            <FeaturedImage src="https://images.unsplash.com/photo-1547406683-88dd1d03c425?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"/>
            <FeaturedTitle>
                {/* <h1>{data[2].name || "none"}</h1> */}
                <h3>Biavav, Kathmandu</h3>
            </FeaturedTitle>
        </FeaturedItem></>}
    </Container>
  )
}

export default FeaturedHostels