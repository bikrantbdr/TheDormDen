import React,{useCallback} from 'react'
import styled from 'styled-components'
import {useDropzone} from 'react-dropzone'
import addImage from '../assets/addImage.png'

const Container = styled.div`
width: 90%;
height:30%;
border: 1px dashed #D179FF;
border-radius: 6px;
background-color: #fff;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media (max-width: 768px) {
  height: 20vh;
}

`

const ImageDropzone = ({hostelGallery,setHostelGallery}) => {

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result
          setHostelGallery(previous => { return [...previous, binaryStr] })
        }
        reader.readAsDataURL(file)
        })
      }, [])
    
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <Container {...getRootProps()} >
        <input {...getInputProps()} id="images"/>
        {
        isDragActive ?
        <div>Drop the files here ...</div> :
        <div>
          <div  style={{display:"flex", justifyContent:"center",marginBottom:"0.5rem"}}>
          <img src={addImage} alt="add" style={{height:"25px", width:"25px", }}  />
          </div>
          <div>Upload your Images</div>

        </div>
      }
    </Container>

  )
}

export default ImageDropzone