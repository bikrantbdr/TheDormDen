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
<<<<<<< HEAD
  z-index: 5;
  cursor: pointer;
`
const Overlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #d6d5d586;
  z-index: 19;
  /* filter:blur(4px); */
`
=======
  z-index: 10;
  cursor: pointer;
`
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a

const CauroselContainer = styled.div`

  width: 100vw;
  height: 100vh;
<<<<<<< HEAD
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  /* display: flex;
  justify-content: center;
  align-items: center; */

  `
const CarouselImages = styled.div`
  height: 100vh;
  width: 90vw;
  margin: 0 auto; 
  z-index: 21;
=======
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
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
  /* margin:2rem; */
  `
const Cancel = styled.div`
position: absolute;
  top: 10px;
<<<<<<< HEAD
  right: 30px;
=======
  left: 10px;
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
  z-index: 30;
  height:1.5rem;
  width:1.5rem;
  background-color: #ff3232;
<<<<<<< HEAD
  color: #fffafa;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  z-index: 21;
  cursor: pointer;

  
`
const Images = styled.img`
  height:70vh;
  width:80%;
  object-fit:cover;
  margin: 15vh auto;
  z-index: 21;

  @media (max-width: 768px) {
    height: 50vh;
    width: 100%;
  }

`
=======
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
  
`
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a


const HostelImageSection = ({images,longitude,latitude}) => {
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [carouselStatus,setCarouselStatus ] = useState(false);

    const carouselStatusHandler = () => {
        setCarouselStatus(!carouselStatus)
<<<<<<< HEAD
        if(carouselStatus){
            document.body.style.overflow = "auto"
        }else{
            document.body.style.overflow = "hidden"
        }
=======
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
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
        </Map>
        </MapContainer>
        {
<<<<<<< HEAD
            carouselStatus &&
            <>
              <Overlay />
              <CauroselContainer>
                <Cancel onClick={carouselStatusHandler} >
                  X
                </Cancel>
                <Carousel infiniteLoop={true}  >
                  {
                    images.map((image,index) => {
                      return <CarouselImages key={index}>
                            <Images src={image} alt="" />
                            </CarouselImages>
                      })
                    }
              </Carousel>

              </CauroselContainer>
            </>
=======
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
>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
        }
        


    </Container>
  )
}

export default HostelImageSection