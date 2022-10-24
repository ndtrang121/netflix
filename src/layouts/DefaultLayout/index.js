import classNames from 'classnames/bind'
import { useLayoutEffect, useState } from 'react'
import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'

import Header from '../components/Header'
import TopBackground from '../components/TopBackground'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const [visibleHeader, setVisibleHeader] = useState(false)
    const [dataTrending, setDataTreding] = useState([])
    // Handle scroll to visible header
    useLayoutEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setVisibleHeader(true)
            } else {
                setVisibleHeader(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        //cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Handle get id trailer
    useLayoutEffect(() => {
        const fecthTrailer = async () => {
            try {
                await request(`/trending/all/week`).then((res) => {
                    setDataTreding(res)
                })
            } catch (error) {
                // throw new Error()
            }
        }
        fecthTrailer()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Header className={cx({ header: visibleHeader })} />
            <TopBackground />
            <div className={cx('container')}>
                <ul className={cx('trending-items')}>
                    {dataTrending.map((data, index) => (
                        <li key={index} className={cx('trending-item')}>
                            <Backdrop className={cx('trending-bg')} path={data.backdrop_path || data.poster_path} />
                        </li>
                    ))}
                </ul>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout
