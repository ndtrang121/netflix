import { Fragment, useLayoutEffect, useState } from 'react'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'
import MiniModalMovie from '~/layouts/components/MiniModalMovie'
import Movie from '~/layouts/components/Movie'
import request from '~/utils/request'

const list_id = process.env.REACT_APP_LIST_ID

function Favorite() {
    const [myList, setMyList] = useState([])
    useLayoutEffect(() => {
        async function fetchData() {
            await request(`/list/${list_id}`).then((res) => {
                setMyList(res.items)
            })
        }
        fetchData()
    })
    return (
        <Fragment>
            <Header />
            <h1>Favorite page</h1>
            {myList !== [] &&
                myList.map((data, index) => (
                    <Movie key={index} data={data}></Movie>
                ))}
            <Footer />
            <MiniModalMovie />
        </Fragment>
    )
}

export default Favorite
