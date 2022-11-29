import { Fragment, useLayoutEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Favorite.module.scss'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'
import MiniModalMovie from '~/layouts/components/MiniModalMovie'
import Movie from '~/layouts/components/Movie'
import request from '~/utils/request'

const list_id = process.env.REACT_APP_LIST_ID

const cx = classNames.bind(styles)

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
            <h1 className={cx('title')}>My List</h1>
            <div className={cx('container')} style={{ margin: '60px' }}>
                {myList.length !== 0 ? (
                    myList
                        .reverse()
                        .map((data, index) => (
                            <Movie key={index} data={data}></Movie>
                        ))
                ) : (
                    <h2 style={{ textAlign: 'center' }}>List empty</h2>
                )}
            </div>
            <Footer />
            <MiniModalMovie />
        </Fragment>
    )
}

export default Favorite
