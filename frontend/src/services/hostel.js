import axios from "axios";

const baseUrl = 'http://localhost:5000';

export const getHostel = async (id) => {
    const response = await axios.get(`${baseUrl}/api/hostels/${id}`);
    return response;
}

export const searchHostels = async (options) => {
    const name = options.name ? `name=${options.name}&` : '';
    const longitude = `longitude=${options.longitude}&`;
    const latitude = `latitude=${options.latitude}&`;
    const room_types = options.seaters == 'any' ? `room_types[]=one_seater&room_types[]=two_seater&room_types[]=three_seater&room_types[]=four_seater&` : `room_types[]=${options.seaters}&`;
    const price_upper = `price_upper=200000&`;
    const price_lower = `price_lower=0`;

    const query_str = `${name}${longitude}${latitude}${room_types}${price_upper}${price_lower}`;
    const response = await axios.get(`${baseUrl}/api/hostels?${query_str}`);
    return response;
}

export const registerHostel_backend = async (hostel) => {

    const response = await axios.post(`${baseUrl}/api/hostels/register`, hostel);
    return response;
}

