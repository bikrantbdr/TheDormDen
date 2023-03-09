import React,{useCallback} from 'react'
import styled from 'styled-components'
import {useDropzone} from 'react-dropzone'

import Avatar from '../assets/avatar.png'
import cancelimg from '../assets/cancel.png'

const ProfilePicDiv = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #000;
   overflow: hidden;
  object-fit: cover;
`

const ProfileDropzone = ({profilePic,setProfilePic}) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result
          setProfilePic(binaryStr)
        }
        reader.readAsDataURL(file)
      }, [])
    
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <ProfilePicDiv {...getRootProps()} >
        <input {...getInputProps()} id="profilepic"/>
        <img src={profilePic} alt="Profile Pic" style={{height:"100%", width:"100%"}}  />
      </ProfilePicDiv>
  )
}

export default ProfileDropzone