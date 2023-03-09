import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from 'react-router'

import Avatar from '../assets/avatar.png'
import DocumentDropzone from '../Components/DocumentDropzone'
import ProfileDropzone from '../Components/ProfileDropzone'
import NavAndSidebar from '../Components/NavAndSidebar'
import {Helmet} from "react-helmet";
import { proxy } from '../assets/proxy'


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

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding-bottom: 1rem;
  }
`
const TitleDiv = styled.div`
  margin: 1rem 0 1rem 0;
`
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: #fff;
  width: 60%;
  height:auto;
  padding: 0 1rem;
  margin: 0.5rem auto;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LabelInput = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  gap:0.25rem;
  margin: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
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


const Button = styled.button`
  width: 35%;
  height: 2rem;
  margin: 0.5rem;
  background-color: #D179FF;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #D179FF;
    opacity: 0.8;
  }
`



const UserRegistrationPage = () => {

  const [firstname, setFirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("0")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState(`${Avatar}`)
  const [document, setDocument] = useState("")
  const baseUrl = proxy
  const navigate = useNavigate()


  useEffect(() => {
    // console.log(document)
  }, [document])

  const submitHandler = async(e) => {
    e.preventDefault()
    const user = 
    {
      first_name:firstname,
      middle_name:middlename,
      last_name:lastname,
      email:email,
      username:username,
      password:password,
      gender:gender,
      phone_number:phoneNumber,
      profile_picture:profilePic,
      document:document,
      typeof_user:"student",
      address:"hetauda"
    }
    await axios.post(`${baseUrl}/api/users/register`,user)
    .then(res => {
        // console.log(res);
        navigate('/login')
    })
    .catch(err => {
        // console.log(err);
        alert("Something went wrong")
    })
  }


  return (
    <>
    <Helmet>
        <title>Dormden | User Registration </title>
        <meta name="description" content="Register your account here with your auth id" />
    </Helmet>
    <NavAndSidebar/>
    <Container>
      <TitleDiv>
        <h1>Register Your Account</h1>
      </TitleDiv>
      <ProfileDropzone profilePic={profilePic} setProfilePic={setProfilePic} />
      <FormDiv>
        <Form autocomplete="off">
          <Row>
            <LabelInput>
              <Label htmlFor='firstname'>First Name</Label>
              <Input type="text" id="firstname" name="firstname" placeholder="Your first name" onChange={(e)=>{setFirstname(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="lastname">Last Name</Label>
              <Input type="text" id="lastname" name="lastname" placeholder="Your last name" onChange={(e)=>{setLastname(e.target.value)}} />
            </LabelInput>
          </Row>
          <Row>
            <LabelInput>
              <Label htmlFor="middlename">Middle Name</Label>
              <Input type="text" id="middlename" name="middlename" placeholder="Your middle name" onChange={(e)=>{setMiddlename(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="gender">Gender</Label>
              <Gender name="gender" id="gender" onChange={(e)=>{setGender(e.target.value)}}>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
              </Gender>
            </LabelInput>
          </Row>
          <Row>
            <LabelInput>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="text" id="phone" name="phone" placeholder="Enter your phone number" onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
            </LabelInput>
          </Row>
          <Row>
            <LabelInput>
              <Label htmlFor="username">User Name</Label>
              <Input type="text" id="username" name="username" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label  htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}} />
            </LabelInput>
          </Row>
        </Form>
      </FormDiv>
      <DocumentDropzone document={document} setDocument={setDocument} size={false} center={true}/>
      <Button onClick={submitHandler}>Submit</Button>
    </Container>
    </>
  )
}

export default UserRegistrationPage