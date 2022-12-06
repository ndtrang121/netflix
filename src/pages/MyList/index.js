import { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './MyList.module.scss'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'
import MiniModalMovie from '~/layouts/components/MiniModalMovie'
import Movie from '~/layouts/components/Movie'
import request from '~/utils/request'
import Loading from '~/components/Loading'

const list_id = process.env.REACT_APP_LIST_ID

const cx = classNames.bind(styles)

function MyList() {
    const [myList, setMyList] = useState([])
    const [end, setEnd] = useState(false)
    useEffect(() => {
        async function fetchData() {
            try {
                await request(`/list/${list_id}`).then((res) => {
                    setMyList(res.items)
                })
            } catch (error) {
            } finally {
                setEnd(true)
            }
        }
        fetchData()
    })
    return (
        <Fragment>
            <Header className={cx('main-header')} />
            <h1 className={cx('sub-header')} style={{ marginLeft: 'var(--PADDING)' }}>
                My List
            </h1>
            <div className={cx('container')} style={{ margin: '60px' }}>
                {myList.length !== 0 ? (
                    myList
                        .reverse()
                        .map((data, index) => <Movie className={cx('list-item')} key={index} data={data}></Movie>)
                ) : !end ? (
                    <Loading height={200} />
                ) : (
                    <h3 style={{ margin: 'auto' }}>List Empty</h3>
                )}
            </div>
            <Footer />
            <MiniModalMovie />
        </Fragment>
    )
}

export default MyList
