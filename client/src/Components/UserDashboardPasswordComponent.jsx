import {useState,useEffect, useContext} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { proxy } from '../assets/proxy'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85vh;
    width: 80vw;
    margin: 0rem auto;
    /* background-color: #F8F8F8; */
    /* border-radius: 18px; */
    /* border: 1px solid #382B2F; */
`
const LabelInput = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  gap:0.25rem;
  margin: 0.5rem;

    @media (max-width: 950px) {
        width: 40%;
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
const ErrorDiv = styled.div`
    color: red;
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0.5rem;
    height: 1rem;

`

const Button = styled.button`
  width: 25%;
  height: 2rem;
  margin: 1rem;
  background-color: #D179FF;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;

    &:hover {
        cursor: pointer;
        background-color: #D179FF;
        opacity: 0.8;
    }

    @media (max-width: 950px) {
        width: 40%;
    }
`

const UserDashboardPasswordComponent = () => {
    const [oldpassword, setOldPassword] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState(false)
    const baseURL = proxy
    const { user_id } = useContext(AuthContext)

    const submitHandler = (e) => {
        if (newpassword !== confirmpassword) {
            setError('Passwords do not match')
            setTimeout(() => {
                setError('')
            }, 3000)
        } else {
            setError('')
            setConfirm(true)
        }

        if (confirm == true) {
            console.log('no error')
            const data = {
                old_password: oldpassword,
                new_password: newpassword
            }
            axios.put(`${baseURL}/api/users/update/password/${user_id}`, data, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    setError(err.response.data.error)
                    setTimeout(() => {
                        setError('')
                    }, 3000)
                })
        }

    }
  return (
    <Container>
        <LabelInput>
            <Label htmlFor='old' >Current Password</Label>
            <Input id="old" type="password"  onChange={(e)=>{ setOldPassword(e.target.value)}} />
        </LabelInput>
        <LabelInput>
            <Label htmlFor='new'  >New Password</Label>
            <Input id='new' type="password" onChange={(e)=>{ setNewPassword(e.target.value)}} />
        </LabelInput>
        <LabelInput>
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input id="confirm" type="password" onChange={(e)=>{ setConfirmPassword(e.target.value)}} />
        </LabelInput>
        <Button onClick={submitHandler} >Update Password</Button>
        <ErrorDiv>{error}</ErrorDiv>
    </Container>
  )
}

export default UserDashboardPasswordComponent