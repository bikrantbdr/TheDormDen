import React , {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Map, Marker, Draggable } from "pigeon-maps";
import location from "./location.svg";
import axios from 'axios';

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
    margin-bottom: 1rem;
    text-align: center;
    `
const Formcomponent = styled.div`
    display: flex;
    width: 80vw;
    `
const Left = styled.div`
    flex: 1;

`
const Right = styled.div`
    flex: 1;
`
const Label = styled.label`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: block;
`



const RegisterHostelPage = () => {
    const [hostelname, setHostelname] = useState('')
    const [gender, setGender] = useState('')
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [locationanchor, setAnchor] = useState([25, 85]);

    const [hosteldocument, setHosteldocument] = useState([])
    const [hosteldocumentimage, setHosteldocumentimage] = useState([])
    const [cloudDocumentimages, setCloudDocumentImages] = useState([]);

    const [hostelGallery, setHostelGallery] = useState([])
    const [hostelGalleryImages, setHostelGalleryImages] = useState([])
    const [cloudHostelGallery, setCloudHostelGallery] = useState([]);

    const onmapclickhandler = async(e) => {
      setAnchor(e.latLng)
    }

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
                        setCloudDocumentImages((previousImages) => previousImages.concat(res.data.secure_url));
                        console.log(cloudDocumentimages);
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
                    <Label>Hostel Name:
                    <input type="text" name="name" onChange={(e) =>{setHostelname(e.target.value)}} placeholder="Enter Hostel Name" />
                    </Label>
                    <Label> Gender: 
                    <select name="gender" id="gender" onChange={(e) => {setGender(e.target.value)}}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    </Label>
                    <Label>Location
                        <Map height={300} width={500} center={center} zoom={zoom} onClick={onmapclickhandler}>
                        <Draggable
                            offset={[25, 50]}
                            anchor={locationanchor}
                            onDragEnd={setAnchor}
                        >
                            <img src={location} width={50} height={50} alt="Pigeon!" />
                        </Draggable>
                        </Map>
                    </Label>
                    <Label>
                        Hostel Document:
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
                    </Label>
                </Left>
                <Right> 
                    <Label>Hostel Description:
                    <textarea name="description" id="description" cols="30" rows="10" style={{display:"block"}}></textarea>
                    </Label>

                    <label>
                        + Add Images
                        <br />
                        <input
                        type="file"
                        name="images"
                        onChange={hostelimagehandler}
                        multiple
                        accept="image/png , image/jpeg, image/webp."
                        />
                    </label>

                    <div className="images">
                        {hostelGalleryImages &&
                        hostelGalleryImages.map((image, index) => {
                            return (
                            <div key={image} className="image">
                                <img src={image} height="200" alt="upload" />
                                <button onClick={() => deleteImagesHandler(image,index)}>
                                X
                                </button>
                            </div>
                            );
                        })}
                    </div>

                    <input type="submit" value="Submit" onClick={submithandler}/>

                </Right>
            </Formcomponent>
        </form>
    </Regis>
  )
}

export default RegisterHostelPage