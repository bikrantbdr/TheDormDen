import React,{useState} from 'react'
import styled from 'styled-components'
import { Map, Marker, Draggable } from "pigeon-maps";
import axios from 'axios';
import location from '../assets/location.svg'
import cancelimg from '../assets/cancel.png'

import NavAndSidebar from '../Components/NavAndSidebar'
import HosteldocsDropzone from '../Components/HosteldocsDropzone';
import ImageDropzone from '../Components/ImageDropzone';


const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85vh;
    width: 80vw;
    margin: 0rem auto;
    background-color: #F8F8F8;
    border-radius: 18px;
    border: 1px solid #382B2F;
`
const TitleDiv = styled.div`
    margin: 1rem 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
`

const FormComponent = styled.div`
    width: 80%;
    height: 80%;
    margin: 0.5rem auto;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    gap: 1rem;

`
const Left = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

`
const Right = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;

`

const LabelInput = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    gap:0.25rem;
    margin: 0.3rem;
`
const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
`
const Input = styled.input`
    height: 2rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #D179FF;
    border-radius: 6px;

    &:focus {
        outline: none;
        border: 1px dashed #D179FF;
        background-color: #e9e9e940;
    }
`
const Gender = styled.select`
    height: 1.5rem;
    width: 30%;
    padding: 0.1rem;
    border: 1px solid #D179FF;
    border-radius: 6px;
`
const Description = styled.textarea`
    height: 10rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #D179FF;
    border-radius: 6px;
`

const Images = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
    width: 90%;
    height:30%;
    background-color: #fff;
`
const ImageContainer = styled.div`
    dispaly: flex;
    position: relative;
`
const Image = styled.img`
    width: 100px;
    height: 100px;
`
const Canceldiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
`
const Button = styled.button`
    width: 50%;
    height: 2rem;
    border: none;
    border-radius: 6px;
    background-color: #D179FF;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
`

const HostelRegistrationPage = () => {
    const [hostelname, setHostelname] = useState('')
    const [gender, setGender] = useState(0)
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [locationanchor, setAnchor] = useState([25, 85]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [description, setDescription] = useState('')
    const [verified, setVerified] = useState(false)
    const [document, setDocument] = useState("")
    const [hostelGallery, setHostelGallery] = useState([])
    const baseUrl = 'http://localhost:5000'


    const onmapclickhandler = async(e) => {
        setAnchor(e.latLng)
          setLatitude(e.latLng[0])
          setLongitude(e.latLng[1])
      }
    const submitHandler = async(e) => {
        const data={
            name: hostelname,
            longitude: longitude,
            latitude: latitude,
            description: description,
            for_gender: gender,
            verified: verified,
            document: document,
            images: hostelGallery
        }
        const response = await axios.post(`${baseUrl}/api/hostels/register`, data)
    }
  return (
    <>
        <NavAndSidebar/>
        <Container>
            <TitleDiv>
                Hostel Registration
            </TitleDiv>
            <FormComponent>

                <Left>
                    <LabelInput>
                        <Label htmlFor='name'>Hostel Name:</Label>
                        <Input type="text" name="name" onChange={(e) =>{setHostelname(e.target.value)}} placeholder="Enter Hostel Name" />
                    </LabelInput>
                    <LabelInput>
                    <Label> Gender: 
                        </Label >
                        <Gender name="gender" id="gender" onChange={(e) => {setGender(e.target.value)}}>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </Gender>
                    </LabelInput>
                    <LabelInput>
                        <Label htmlFor='location'>Location</Label>
                        <Map height={200} width={400} center={center} zoom={zoom} onClick={onmapclickhandler}>
                            <Draggable
                                offset={[25, 50]}
                                anchor={locationanchor}
                                onDragEnd={setAnchor}
                                >
                                <img src={location} width={50} height={50} alt="Pigeon!" />
                            </Draggable>
                        </Map>
                    </LabelInput>
                    <HosteldocsDropzone document={document} setDocument={setDocument} />
                </Left>
                <Right>
                    <LabelInput>
                        <Label htmlFor='description'>Hostel Description:</Label>
                        <Description name="description" id="description" cols="30" rows="10" style={{display:"block"}} onChange={(e)=>setDescription(e.target.value)} ></Description>
                    </LabelInput>
                    <ImageDropzone hostelGallery={hostelGallery} setHostelGallery={setHostelGallery} />
                    <Images>
                        { 
                        hostelGallery.length > 0 &&
                            hostelGallery.map((image, index) => {
                                return (
                                    <ImageContainer key={index}>
                                        <Image src={image} alt="hostel"/>
                                        <Canceldiv>
                                        <img src={cancelimg} alt="cancel" style={{height:"25px", width:"25px", }} onClick={()=>{setHostelGallery("")}}  />
                                        </Canceldiv>
                                        
                                    </ImageContainer>
                                )
                            }
                            )
                        }

                    </Images>
                </Right>
            </FormComponent>
            <Button onClick={submitHandler}>Submit</Button>
        </Container>

    </>
  )
}

export default HostelRegistrationPage