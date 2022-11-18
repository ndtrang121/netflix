import request from './request'

async function getGenre(idGenres, type) {
    const dataGenres = await request(`/genre/${type}/list`).then((res) => {
        return res.genres
    })
    let data = idGenres.map((id, index) => {
        const value = dataGenres.find((genre) => genre.id === id)
        return value.name
    })
    return data
}

export default getGenre
