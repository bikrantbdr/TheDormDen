import React, { useState } from "react"
import styled from 'styled-components'
import { Map, Marker } from "pigeon-maps";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 45%;
  background-color: #382B2F40;
  position: relative;


  @media (max-width: 768px) {
    flex-direction: column;
    height: 75%;
    width: 100%;
    gap:18px;
    padding: 12px;
  }

`
const ImageContainer = styled.div`
  height: 90%;
  width: 55%;
  /* background-color: #fff; */

  display: grid;
  grid-row-gap: 12px;
  grid-column-gap:2%;
  grid-template-columns: 38% 29% 29% ;
  grid-template-rows: 49% 49%;
  grid-template-areas:
  "first second second"
  "first  third fourth";

  @media (max-width: 768px) {
    width: 90%;
    height: 50%;
  }
`
const FirstImage = styled.div`
  grid-area: first;
  border-radius: 8px;
  overflow: hidden;
  
  `
const SecondImage = styled.div`
  grid-area: second;
  border-radius: 8px;
  overflow: hidden;
  
  `
const ThirdImage = styled.div`
  grid-area: third;
  border-radius: 8px;
  overflow: hidden;
  
  `
const FourthImage = styled.div`
  grid-area: fourth;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const MapContainer = styled.div`
    width: 35%;
    height: 90%;
    background-color: #fff;

    @media (max-width: 768px) {
    width: 90%;
    height: 50%;
    }
`
const MoreImages = styled.div`
  height: 100%;
  width: 100%;
  background-color: #59585880;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  cursor: pointer;
`

const CauroselContainer = styled.div`

  width: 100vw;
  height: 100vh;
  background-color: #2828287b;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  `
const CarouselImages = styled.div`
  height: 90vh;
  width: 90vw;
  margin: 0 auto;
  /* margin:2rem; */
  `
const Cancel = styled.div`
position: absolute;
  top: 10px;
  left: 10px;
  z-index: 30;
  height:1.5rem;
  width:1.5rem;
  background-color: #ff3232;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
  
`


const HostelImageSection = ({images,longitude,latitude}) => {
    const [center, setCenter] = useState([latitude, longitude]);
    const [zoom, setZoom] = useState(14);
    const [carouselStatus,setCarouselStatus ] = useState(false);

    const carouselStatusHandler = () => {
        setCarouselStatus(!carouselStatus)
    }

  return (
    <Container>
        <ImageContainer>
            <FirstImage>
                <img src={images[0]} alt="hostel" style={{height:"100%",width:"100%",objectFit: "cover"}} />
            </FirstImage>
            <SecondImage>
                <img src={images[1]} alt="hostel" style={{height:"100%",width:"100%",objectFit: "cover"}} />
            </SecondImage>
            <ThirdImage>
                <img src={images[2]} alt="hostel" style={{height:"100%",width:"100%",objectFit: "cover"}} />
            </ThirdImage>
            <FourthImage>
                <img src={images[3]} alt="hostel" style={{height:"100%",width:"100%",objectFit: "cover"}} />
                <MoreImages onClick={carouselStatusHandler}>
                    <h1 style={{color:"#fffafa",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>+{images.length-4}</h1>
                </MoreImages>
            </FourthImage>
        </ImageContainer>

        <MapContainer>
        <Map center={center} zoom={zoom}>
        <Marker 
        // width={100}
        anchor={[latitude, longitude]} 
        color="#f40d0d"
      />
      {console.log(latitude,longitude)}
        </Map>
        </MapContainer>
        {
            carouselStatus && <CauroselContainer>
              <Cancel onClick={carouselStatusHandler} >
                X
              </Cancel>
               <Carousel infiniteLoop={true}  >
                {
                    images.map((image,index) => {
                        return <CarouselImages key={index}>
                          <img src={image} alt="" style={{height:"100%",width:"100%", objectFit:"cover"}} />
                          </CarouselImages>
                    })
                }

            </Carousel>

            </CauroselContainer>
        }
        


    </Container>
  )
}

export default HostelImageSection