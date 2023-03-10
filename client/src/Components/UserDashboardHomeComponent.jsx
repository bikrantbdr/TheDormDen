import {useState,useEffect,useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

import ProfileDropzone from './ProfileDropzone'
import styled from 'styled-components'
import axios from 'axios'
import Avatar from '../assets/avatar.png'
import { proxy } from '../assets/proxy'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80vw;
  margin: auto auto;
  /* background-color: #f8f8f8; */
  border-radius: 8px;
  /* border: 1px solid #382b2f; */
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  align-items: center;
  min-height: 40%;
  width: 65%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const LabelInput = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  gap:0.25rem;
  margin: 0.5rem;
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
  padding: 0.5rem;
  margin: 3rem;
  background-color: #D179FF;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
    background-color: #dea0ff;
    opacity: 0.8;
  }
`
const SucessDiv = styled.div`
  color: #94ff79;
`
const ErrorDiv = styled.div`
  color: #ff7979;
`

const UserDashboardHomeComponent = () => {
  const [firstname, setFirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState(`${Avatar}`)
  const [gender, setGender] = useState("0")
  const [user, setUser] = useState(null)

  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const baseURL = proxy
  const {user_id} = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(false)
        setUser([])
        setLoading(true)
        const response = await axios.get(`${baseURL}/api/users/${user_id}`)
        setUser(response.data)
        Autofillhandle(response.data)
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const Autofillhandle = (user) => {
    setFirstname(user.profile.first_name)
    setMiddlename(user.profile.middle_name)
    setLastname(user.profile.last_name)
    setEmail(user.email)
    setUsername(user.username)
    setAddress(user.profile.address)
    setProfilePic(user.profile.profile_picture)
    setPhoneNumber(user.profile.phone_number)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    // console.log(typeof(profilePic))
    const user = 
    {
      username:username,
      email:email,
      first_name:firstname,
      middle_name:middlename,
      last_name:lastname,
      gender:gender,
      phone_number:phoneNumber,
      profile_picture:profilePic,
      document:document,
      typeof_user:"student",
      address:address
    }
    await axios.put(`${baseURL}/api/users/update/${user_id}`,user,{withCredentials:true} )
    .then(res => {
        // console.log(res);
        setSuccessMessage("Profile Updated")

    })
    .catch(err => {
        // console.log(err);
        setErrorMessage(err.message)
    })
  }


  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
        <ProfileDropzone profilePic={profilePic} setProfilePic={setProfilePic} />
        <Form>
          <Row>
            <LabelInput>
              <Label htmlFor='firstname'>First Name</Label>
              <Input type="text" id="firstname" name="firstname" placeholder={firstname} onChange={(e)=>{setFirstname(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="lastname">Last Name</Label>
              <Input type="text" id="lastname" name="lastname" placeholder={lastname} onChange={(e)=>{setLastname(e.target.value)}} />
            </LabelInput>
          </Row>
          <Row>
            <LabelInput>
              <Label htmlFor="middlename">Middle Name</Label>
              <Input type="text" id="middlename" name="middlename" placeholder={middlename} onChange={(e)=>{setMiddlename(e.target.value)}} />
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
              <Input type="email" id="email" name="email" placeholder={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="text" id="phone" name="phone" placeholder={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
            </LabelInput>
          </Row>
          <Row>
            <LabelInput>
              <Label htmlFor="username">User Name</Label>
              <Input type="text" id="username" name="username" placeholder={username} onChange={(e)=>{setUsername(e.target.value)}} />
            </LabelInput>
            <LabelInput>
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" name="address" placeholder={address} onChange={(e)=>{setAddress(e.target.value)}} />
            </LabelInput>
          </Row>
        </Form>
        <Button onClick={handleUpdate}>Update</Button>
        {successMessage && <SucessDiv>{successMessage}</SucessDiv>}
        {errorMessage && <ErrorDiv>{errorMessage}</ErrorDiv>}
        </>
      )}
    </Container>
  )
}

export default UserDashboardHomeComponent