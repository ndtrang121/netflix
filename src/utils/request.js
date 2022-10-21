import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

export const request = async (path) => {
    try {
        const response = await axios
            .get(`https://api.themoviedb.org/3${path}?api_key=${api_key}`)
            .then((res) => res.data)
        return response.results
    } catch (error) {
        throw new Error(error)
    }
}

export default request
