import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const request = async (path, page = '1') => {
    try {
        const response = await axios
            .get(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=${page}`)
            .then((res) => res.data)
        return response
    } catch (error) {}
}

export default request
