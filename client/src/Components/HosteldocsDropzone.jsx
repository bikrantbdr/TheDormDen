import React,{useCallback} from 'react'
import styled from 'styled-components'
import {useDropzone} from 'react-dropzone'

import addImage from '../assets/addImage.png'
import cancelimg from '../assets/cancel.png'

const DocumentDiv = styled.div`
background-color: #fff;
height: 25%;
width: 90%;
margin: 1rem 0 0 0;
border: 1px dashed #D179FF;
border-radius: 6px;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 0.5rem;

@media (max-width: 768px) {
  height: 20vh;
}
`
const Displaydiv = styled.div`
  position: relative;
`
const DocumentImage = styled.img`
  height: 100px;
  @media (max-width: 768px) {
    height: 15vh;
  }
`
const Cancel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`

const HosteldocsDropzone = ({document, setDocument,size,center}) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result
          setDocument(binaryStr)
        }
        reader.readAsDataURL(file)
      }, [])
    
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <DocumentDiv  {...getRootProps()} >
        
    <input {...getInputProps()} id="iddoc"/>
    {
      document !== null ?
      <Displaydiv>
        <DocumentImage src={document} alt="document" />
        <Cancel>
          <img src={cancelimg} alt="cancel" style={{height:"25px", width:"25px", }} onClick={()=>{setDocument(null)}}  />
        </Cancel>
      </Displaydiv>:
      isDragActive ?
        <div>Drop the files here ...</div> :
        <div>
          <div  style={{display:"flex", justifyContent:"center",marginBottom:"0.5rem"}}>
          <img src={addImage} alt="add" style={{height:"25px", width:"25px", }}  />
          </div>
          <div>Upload your document</div>

        </div>
    } 
  </DocumentDiv>
  )
}

export default HosteldocsDropzone