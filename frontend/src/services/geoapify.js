import axios from "axios";

const autocomplete_query = async(query) => {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=769f09ef503a44d1bcb4218675c23b0c`)
    return response.data.features
}

export { autocomplete_query }