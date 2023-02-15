import React,{useCallback} from 'react'
import styled from 'styled-components'
import {useDropzone} from 'react-dropzone'

const Container = styled.div`
width: 90%;
height:30%;
border: 1px dashed #D179FF;
border-radius: 6px;
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
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </Container>

  )
}

export default ImageDropzone