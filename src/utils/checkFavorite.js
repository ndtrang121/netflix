import request from './request'

const list_id = process.env.REACT_APP_LIST_ID

async function checkFavorite(idMedia) {
    const list = await request(`/list/${list_id}`).then((res) => {
        return res.items
    })
    const data = list.find((item) => idMedia === item.id)
    if (data) return true
    else return false
}

export default checkFavorite
