import axios from "axios";

const baseUrl = 'http://localhost:5000';

/*
                            firstname,
                            middlename,
                            lastname,
                            email,
                            username,
                            password,
                            gender,
                            phoneNumber,
                            avatarCloudinaryURL,
                            idCloudinaryURL
*/


export const registerUser_backend = async (user) => {
    // const username = `username=${user.username}&`;
    // const email = `email=${user.email}&`;
    // const password = `password=${user.password}&`;
    // const firstname = `first_name=${user.firstname}&`;
    // const middlename = `middle_name=${user.middlename}&`;
    // const lastname = `last_name=${user.lastname}&`;
    // const gender = `gender=${user.gender}&`
    // const address = `address=hetauda}&`
    // const phoneNumber = `phone_number=${user.phoneNumber}&`;
    // const avatarCloudinaryURL = `profile_picture=${user.avatarCloudinaryURL}&`;
    // const idCloudinaryURL = `document=${user.idCloudinaryURL}&`;
    // const typeof_user = `typeof_user=student`;


    // // const query_str = username + email + password + firstname + middlename + lastname + gender + phoneNumber + avatarCloudinaryURL + idCloudinaryURL;
    // const query_str = `${username}${email}${password}${firstname}${lastname}${middlename}${gender}${address}${phoneNumber}${avatarCloudinaryURL}${idCloudinaryURL}${typeof_user}}`
    
    await axios.post(`${baseUrl}/api/users/register?$`,user)
                            .then(res => {
                                console.log(res);
                                return res;
                            })
                            .catch(err => {
                                return err;
                            })
    // return response;
}