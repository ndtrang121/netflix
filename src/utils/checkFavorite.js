import request from './request'

const list_id = process.env.REACT_APP_LIST_ID
const favorite_id = process.env.REACT_APP_FAVORITE_ID

async function checkFavorite(idMedia, favorite = false) {
    const list = await request(
        `/list/${!favorite ? list_id : favorite_id}`,
    ).then((res) => {
        return res.items
    })
    const data = list.find((item) => idMedia === item.id)
    if (data) return true
    else return false
}

export default checkFavorite
