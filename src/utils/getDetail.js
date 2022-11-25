import request from './request'

async function getDetail(idMedia, type) {
    const dataDetail = await request(`/${type}/${idMedia}`).then((res) => {
        return res
    })

    return dataDetail
}

export default getDetail
