/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'

import styles from './Slider.module.scss'

const cx = classNames.bind(styles)

function Slider({ path, page = '1' }) {
    const [containerWidth, setContainerWidth] = useState(0)
    const [distance, setDistance] = useState(0)
    const [itemWidth, setItemWidth] = useState(0)
    const [viewed, setViewed] = useState(0)
    const [dataTrending, setDataTreding] = useState([])
    const [numberMovies, setNumberMovies] = useState(0)
    const [end, setEnd] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const ref = useRef()
    const itemsToShow = 6
    const pageNumber = Math.ceil(numberMovies / itemsToShow)
    const mod = numberMovies % itemsToShow

    useEffect(() => {
        setContainerWidth(ref.current.offsetWidth - 120)
        setItemWidth(containerWidth / itemsToShow)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current])

    const handlePrev = () => {
        if (mod !== 0) {
            if (end) {
                setEnd(false)
                setDistance(distance + itemWidth * mod)
                setCurrentPage(currentPage - 1)
                return
            }
        }
        setViewed(viewed - itemWidth)
        setDistance(distance + itemWidth * itemsToShow)
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (mod !== 0) {
            if (Math.abs(distance) === containerWidth * (pageNumber - 2)) {
                setDistance(distance - itemWidth * mod)
                setCurrentPage(currentPage + 1)
                setEnd(true)
                return
            }
        }
        if (end) {
            setDistance(0)
            setEnd(false)
            setCurrentPage(0)
            return
        }
        setViewed(viewed + itemWidth)
        setDistance(distance - itemWidth * itemsToShow)
        setCurrentPage(currentPage + 1)
    }

    const slideProps = {
        style: { transform: `translateX(${distance}px)` },
    }

    // Handle get data
    useLayoutEffect(() => {
        const fecthDta = async () => {
            try {
                await request(path, page).then((res) => {
                    setDataTreding(res)
                    setNumberMovies(res.length)
                })
            } catch (error) {
                // throw new Error()
            }
        }
        fecthDta()
    }, [])
    return (
        <div ref={ref} className={cx('wrapper')}>
            <button className={cx('next-btn')} onClick={handleNext}>
                Next
            </button>
            <div className={cx('slide-indecator')}>
                {dataTrending.map((slide, index) => {
                    if (index === 0 || index % 6 === 0) {
                        return (
                            <div
                                key={index}
                                className={cx('dot-indecator', { active: Math.floor(index / 6) === currentPage })}
                            />
                        )
                    }
                    return null
                })}
            </div>
            <ul style={slideProps.style} className={cx('trending-items')}>
                {dataTrending.map((data, index) => (
                    <li key={index} className={cx('trending-item')}>
                        <Backdrop className={cx('trending-bg')} path={data.backdrop_path || data.poster_path} />
                    </li>
                ))}
            </ul>
            {distance !== 0 && (
                <button className={cx('prev-btn')} onClick={handlePrev}>
                    Prev
                </button>
            )}
        </div>
    )
}

export default Slider
