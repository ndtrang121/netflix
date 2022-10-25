import classNames from 'classnames/bind'
import { useLayoutEffect, useState } from 'react'

import Header from '../components/Header'
import Slider from '../components/Slider'
import TopBackground from '../components/TopBackground'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const [visibleHeader, setVisibleHeader] = useState(false)
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

    return (
        <div className={cx('wrapper')}>
            <Header className={cx({ header: visibleHeader })} />
            <TopBackground />
            <div className={cx('container')}>
                <Slider path="/trending/all/week" />
                <Slider path="/trending/all/week" page="2" />
                <Slider path="/trending/all/week" page="3" />
                <Slider path="/movie/popular" />
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout
