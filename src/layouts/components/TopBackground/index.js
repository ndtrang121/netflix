import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'

import request from '~/utils/request'
import styles from './TopBackground.module.scss'
import Slider from '../Slider'
import Trailer from '../Trailer'

const cx = classNames.bind(styles)

function TopBackground() {
    const location = useLocation()
    const [dataBg, setDataBg] = useState([])
    const [path, setPath] = useState('all')
    const widthTrailer = 'var(--WIDTH-WINDOW)'
    const heightTrailer = 'calc(var(--WIDTH-WINDOW) / 1.777)'
    // Handle get background id
    useLayoutEffect(() => {
        const fetchImage = async () => {
            await request(`/trending/${path}/week`).then((res) => {
                setDataBg(res.results[0])
            })
        }
        fetchImage()
    }, [path])

    useLayoutEffect(() => {
        if (location.pathname === '/browse') {
            setPath('all')
        } else if (location.pathname === '/genre') {
            setPath('tv')
        } else if (location.pathname === '/movies') {
            setPath('movie')
        }
    }, [location.pathname])

    return (
        <div
            className={cx('background-wrapper')}
            style={{
                width: widthTrailer,
                height: heightTrailer,
            }}
        >
            <Trailer
                infoMovie={dataBg}
                large
                widthTrailer={widthTrailer}
                heightTrailer={heightTrailer}
            />

            <div className={cx('trending')}>
                <Slider
                    marginTop={0}
                    path={`/trending/${path}/week`}
                    title={'Trending On Netflix'}
                    nextBtn={true}
                />
            </div>
        </div>
    )
}

export default TopBackground
