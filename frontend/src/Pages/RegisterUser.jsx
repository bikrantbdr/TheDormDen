import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import avatarDefault from '../images/avatar.png'

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  text-align: center;
`
const Title = styled.h1``
const AvatarContainer = styled.div`
    width:200px;
    height:200px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;`
const UpperForm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    `
const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 50%;`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 50%;
`
const LowerForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;`
const DisplayID = styled.div``
const Label = styled.label`
    margin: 5px 0px;
`
const Input = styled.input`
    margin: 5px 0px;
`
const Button = styled.button`
    margin: 20px 0px;`
const ErrorMsg = styled.span``

const RegisterUser = () => {
    
    const [avatarImages, setAvatarImages] = React.useState(null)
    const [avatarFile,setAvatarFile] = React.useState(null)
    const [avatarCloudinaryURL, setAvatarCloudinaryURL] = React.useState(null)


    const [idImage, setIdImage] = React.useState(null)
    const [idFile, setIdFile] = React.useState(null)
    const [idCloudinaryURL, setIdCloudinaryURL] = React.useState(null)

    const [firstname, setFirstname] = React.useState("")
    const [middlename, setMiddlename] = React.useState("")
    const [lastname, setLastname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const avatarclickhandler = (e) => {
        setAvatarImages(URL.createObjectURL(e.target.files[0]))
        setAvatarFile(e.target.files[0])
    }
    const deleteAvatar = () => {
        setAvatarImages(null)
        setAvatarFile(null)
    }

    const idclickhandler = (e) => {
        setIdImage(URL.createObjectURL(e.target.files[0]))
        setIdFile(e.target.files[0])
    }
    const deleteId = () => {
        setIdImage(null)
        setIdFile(null)
    }

    const registerUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        // upload avatar to cloudinary
            const formData = new FormData();
                formData.append("upload_preset", "hostel");
                formData.append("file", avatarFile);
                axios
                    .post("https://api.cloudinary.com/v1_1/dxhwnryud/image/upload", formData)
                    .then((res) => {
                        console.log(res.data.secure_url);
                        setAvatarCloudinaryURL(res.data.secure_url);
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err)
                    }
                     );
            const IdData = new FormData();
            IdData.append("upload_preset", "hostel");
            IdData.append("file", idFile);
                axios
                    .post("https://api.cloudinary.com/v1_1/dxhwnryud/image/upload", IdData)
                    .then((res) => {
                        console.log(res.data.secure_url);
                        setIdCloudinaryURL(res.data.secure_url);
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err)
                    }
                    );
            
    setLoading(false)
    }
  return (
    <Container>
        <Title>Register</Title>
        <AvatarContainer>
            {
            avatarImages &&
            <>
             <img src={avatarImages} alt="avatar" height="125px" width="125px" style={{borderRadius:"50%"}}/>
             <div className="cross" onClick={deleteAvatar}>X</div>
            </>
            }
            {!avatarImages &&
            <>
            <img src={avatarDefault} alt="avatar" />
            <input type="file" onChange={avatarclickhandler}/>
            </>
            }
        </AvatarContainer>
        <Form>
            <UpperForm>
                <Left>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input type="text" id="firstname" name="firstname" placeholder="first name" onChange={(e)=>{setFirstname(e.target.value)}}/>
                    <Label htmlFor="middlename">Middle Name</Label>
                    <Input type="text" id="middlename" name="middlename" placeholder="middle name" onChange={(e)=>{setMiddlename(e.target.value)}} />
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}  />
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" placeholder="middle name" onChange={(e)=>{setUsername(e.target.value)}} />
                </Left>
                <Right>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input type="text" id="lastname" name="lastname" placeholder="last name" onChange={(e)=>{setLastname(e.target.value)}}  />
                    <Label htmlFor="gender">Gender</Label>
                    <select name="gender" id="gender" onChange={(e)=>{setGender(e.target.value)}}  >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="text" id="phone" name="phone" placeholder="Enter your phone number" onChange={(e)=>{setPhoneNumber(e.target.value)}}  />
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}  />
                </Right>
            </UpperForm>
            <LowerForm>
                <Label htmlFor="document">Student ID</Label>
                <br/>
                <Input type="file" id="document" name="document" placeholder="Enter your student id" onChange={idclickhandler}/>
                { idImage &&
                <>
                <DisplayID>
                    <img src={idImage} alt="id" height="125px" width="125px" />
                    <div className="cross" onClick={deleteId}>X</div>
                </DisplayID>
                </>
                }

            </LowerForm>
            <Button onClick={registerUser}>Register</Button>
            
        </Form>
    </Container>
  )
}

export default RegisterUser