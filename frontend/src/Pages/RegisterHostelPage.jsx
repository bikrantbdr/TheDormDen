import React , {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Map, Marker, Draggable } from "pigeon-maps";
import location from "../images/location.svg";
import cancel from "../images/cancel.png";
import axios from 'axios';
import {registerHostel_backend} from '../services/hostel'

const Regis = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    `
const Heading = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin: 0.5rem 0 3rem 0;
    text-align: center;
    `
const Formcomponent = styled.div`
    display: flex;
    width: 80vw;
    `
const Left = styled.div`
    width: 50%;

`
const Right = styled.div`
    width: 50%;
`
const Label = styled.label`
    font-size: 1.2rem;
    font-weight: 600;
    margin:0.5rem 0 0.75rem 0;
    display: block;
`

const ImagesGallery = styled.div`
height: 205px;
width: 100%;
// border: 1px solid #ccc; 
display: flex;
align-items: center;
overflow: auto;
white-space: nowrap;
overflow-y: hidden;
margin: 0.5rem 0;
`

const Image = styled.div`
    height: 100%;
    width:auto;
    position: relative;
    padding-right:0.5rem;
`

const Cancel = styled.div`
    border: none;
    position:absolute;
    top: 0;
    right: 0;
    z-index: 5;
    cursor: pointer;
    color: Red;
`
const Submit = styled.button`
    width: 100%;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    margin-top: 1rem;

`



const RegisterHostelPage = () => {
    const [hostelname, setHostelname] = useState('')
    const [gender, setGender] = useState(0)
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [locationanchor, setAnchor] = useState([25, 85]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [description, setDescription] = useState('')
    // const [forGender, setForGender] = useState(0)
    const [verified, setVerified] = useState(false)



    const [hosteldocument, setHosteldocument] = useState([])
    const [hosteldocumentimage, setHosteldocumentimage] = useState([])
    const [cloudDocumentimages, setCloudDocumentImages] = useState([]);

    const [hostelGallery, setHostelGallery] = useState([])
    const [hostelGalleryImages, setHostelGalleryImages] = useState([])
    const [cloudHostelGallery, setCloudHostelGallery] = useState([]);
    const [cloud, setCloud] = useState(false);

    const onmapclickhandler = async(e) => {
      setAnchor(e.latLng)
        setLatitude(e.latLng[0])
        setLongitude(e.latLng[1])
    }
    useEffect(() => {
        if(cloud){
            console.log("request sending")
            const data={
                id:"63c7d0c049204374e4d008ae",
                name: hostelname,
                longitude: longitude,
                latitude: latitude,
                description: description,
                for_gender: gender,
                verified: verified,
                document: cloudDocumentimages,
                images:cloudHostelGallery
            }
            registerHostel_backend(data)
        }
    }, [cloud])

    // useEffect(() => {
    //     console.log(locationanchor)
    // }, [locationanchor])

    const hosteldocumentHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file;
          });

        setHosteldocument((prev) => [...prev, ...imagesArray]);
        for(let i=0; i<selectedFilesArray.length; i++){
            const reader = new FileReader();
            reader.onload = (e) => {
                setHosteldocumentimage((previousImages) => previousImages.concat(e.target.result));
            }
            reader.readAsDataURL(selectedFilesArray[i]);
        }
    }

    function deleteDocumentHandler(image,index) {
        // console.log(index);
        const newarray = [...hosteldocument]
        newarray.splice(index,1);
        setHosteldocument(newarray);
        setHosteldocumentimage(hosteldocumentimage.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }
    
    
    
    const hostelimagehandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file;
        });
        
        setHostelGallery((prev) => [...prev, ...imagesArray]);
        for(let i=0; i<selectedFilesArray.length; i++){
            const reader = new FileReader();
            reader.onload = (e) => {
                setHostelGalleryImages((previousImages) => previousImages.concat(e.target.result));
            }
            reader.readAsDataURL(selectedFilesArray[i]);
        }
    }
    
    function deleteImagesHandler(image,index) {
        // console.log(index);
        const newarray = [...hostelGallery]
        newarray.splice(index,1);
        setHostelGallery(newarray);
        setHostelGalleryImages(hostelGalleryImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }
    const submithandler = (e) => {
        e.preventDefault();
        //hostel document upload
        hosteldocumentimage.forEach((img) => {
            const formData = new FormData();
                formData.append("upload_preset", "hostel");
                formData.append("file", img);
                axios
                    .post("https://api.cloudinary.com/v1_1/dxhwnryud/image/upload", formData)
                    .then((res) => {
                        // console.log(res.data.secure_url);
                        setCloudDocumentImages((previousImages) => previousImages.concat(res.data.secure_url));
                        // console.log(cloudDocumentimages);
                    })
                    .catch((err) => {
                        console.log(err);
                    }
                    );
            
        });

        //hostel data upload
        hostelGalleryImages.forEach((img) => {
            const formData = new FormData();
                formData.append("upload_preset", "hostel");
                formData.append("file", img);
                axios
                    .post("https://api.cloudinary.com/v1_1/dxhwnryud/image/upload", formData)
                    .then((res) => {
                        console.log(res.data.secure_url);
                        setCloudHostelGallery((previousImages) => previousImages.concat(res.data.secure_url));
                        console.log(cloudDocumentimages);
                        setCloud(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    }
                    );
        });


    }

  return (
    <Regis>
        <Heading>Register Hostel</Heading>
        <form action="">
            <Formcomponent>
                <Left>
                    <Label htmlFor='name'>Hostel Name:
                    </Label>
                    <input type="text" name="name" onChange={(e) =>{setHostelname(e.target.value)}} placeholder="Enter Hostel Name" />
                    <Label> Gender: 
                    </Label >
                    <select name="gender" id="gender" onChange={(e) => {setGender(e.target.value)}}>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                    <Label htmlFor='location'>Location</Label>
                        <Map height={300} width={500} center={center} zoom={zoom} onClick={onmapclickhandler}>
                        <Draggable
                            offset={[25, 50]}
                            anchor={locationanchor}
                            onDragEnd={setAnchor}
                        >
                            <img src={location} width={50} height={50} alt="Pigeon!" />
                        </Draggable>
                        </Map>
                    <Label htmlFor='document'>
                        Hostel Document:
                    </Label>
                        <div className="hosteldocumentimage">
                            {
                            hosteldocumentimage.length>0 && hosteldocumentimage.map((image,index) => {
                                return (
                                    <div className="image" key={index}>
                                        <img src={image} alt=""  height={350} width={350}/>
                                        <button onClick={() => {deleteDocumentHandler(image,index)}}>Delete</button>
                                    </div>
                                )
                            })
                            }
                            {
                                hosteldocumentimage.length<1 && <input type="file" name="hosteldoc" id="hosteldoc" onChange={hosteldocumentHandler} />
                            }
                        </div>
                </Left>
                <Right> 
                    <Label htmlFor='description'>Hostel Description:
                    <textarea name="description" id="description" cols="30" rows="10" style={{display:"block"}} onChange={(e)=>setDescription(e.target.value)} ></textarea>
                    </Label>

                    <Label>
                        Hostel Images:
                        <br/>
                    </Label>
                        <input
                        type="file"
                        name="images"
                        onChange={hostelimagehandler}
                        multiple
                        accept="image/png , image/jpeg, image/webp."
                        />

                    <ImagesGallery>
                        {hostelGalleryImages &&
                        hostelGalleryImages.map((image, index) => {
                            return (
                            <Image key={image} className="image">
                                <img src={image} height="100%" alt="upload" />
                                <Cancel onClick={() => deleteImagesHandler(image,index)}>
                                <img src={cancel} alt="cancel" />
                                </Cancel>
                            </Image>
                            );
                        })}
                    </ImagesGallery>

                    <Submit type="submit" value="Submit" onClick={submithandler}>Save</Submit>

                </Right>
            </Formcomponent>
        </form>
    </Regis>
  )
}

export default RegisterHostelPage