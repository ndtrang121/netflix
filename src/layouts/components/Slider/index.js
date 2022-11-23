/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { useContext, useLayoutEffect, useState } from 'react'

import request from '~/utils/request'
import styles from './Slider.module.scss'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'
import Movie from '../Movie'

const cx = classNames.bind(styles)

function Slider({ path, page = '1', title, nextBtn = false, marginTop = 55 }) {
    const { SCROLLWIDTH, itemWidth, itemsToShow, marginRight, padding } =
        useContext(ResponsiveContext)

    const [dataTrending, setDataTrending] = useState([])
    const [distance, setDistance] = useState(0)
    const [numberMovies, setNumberMovies] = useState(0)
    const [end, setEnd] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [showIndecator, setShowIndecator] = useState(false)

    let pageNumber = Math.ceil(numberMovies / itemsToShow)

    const handlePrev = () => {
        const mod = numberMovies % itemsToShow
        if (mod !== 0) {
            if (end) {
                setEnd(false)
                setDistance(distance + (itemWidth + marginRight) * mod)
                setCurrentPage(currentPage - 1)
                return
            }
        }
        setDistance(distance + (itemWidth + marginRight) * itemsToShow)
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        const mod = numberMovies % itemsToShow
        if (
            mod !== 0 &&
            Math.abs(distance) ===
                (itemWidth + marginRight) * itemsToShow * (pageNumber - 2)
        ) {
            setDistance(distance - (itemWidth + marginRight) * mod)
            setCurrentPage(currentPage + 1)
            setEnd(true)
            return
        } else if (
            mod === 0 &&
            Math.abs(distance) ===
                (itemWidth + marginRight) * itemsToShow * (pageNumber - 2)
        ) {
            setDistance(distance - (itemWidth + marginRight) * itemsToShow)
            setCurrentPage(currentPage + 1)
            setEnd(true)
            return
        }

        if (end) {
            setDistance(0)
            setEnd(false)
            setCurrentPage(0)
            return
        }
        setDistance(distance - (itemWidth + marginRight) * itemsToShow)
        setCurrentPage(currentPage + 1)
    }

    // Handle get data
    useLayoutEffect(() => {
        setDistance(0)
        setCurrentPage(0)
        const fetchDta = async () => {
            try {
                await request(path, page).then((res) => {
                    setDataTrending(res.results)
                    setNumberMovies(res.results.length)
                })
            } catch (error) {
                // throw new Error()
            }
        }
        fetchDta()
    }, [path])

    // Handle on Touch device
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const touchDistance = touchStart - touchEnd
        const isLeftSwipe = touchDistance > minSwipeDistance
        const isRightSwipe = touchDistance < -minSwipeDistance
        if (isLeftSwipe) {
            handleNext()
        } else if (isRightSwipe && distance < 0) {
            handlePrev()
        }
    }

    return (
        <div className={cx('wrapper')} style={{ marginTop: `${marginTop}px` }}>
            <div
                className={cx('header')}
                style={{ marginLeft: 'var(--PADDING)' }}
            >
                <h1 className={cx('title')}>{title}</h1>
                <div className={cx('explore')}>
                    <span className={cx('title-explore')}>Explore All</span>
                    <FontAwesomeIcon
                        className={cx('icon-explore', { show: showIndecator })}
                        icon={faChevronRight}
                    />
                </div>
            </div>
            <div
                className={cx('items-control')}
                onMouseOver={() => {
                    setShowIndecator(true)
                }}
                onMouseOut={() => {
                    setShowIndecator(false)
                }}
            >
                <div
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        transform: `translateX(${distance}px)`,
                        margin: `0 ${padding}px`,
                    }}
                    className={cx('trending-items')}
                >
                    {dataTrending.map((data, index) => (
                        <Movie key={index} data={data}></Movie>
                    ))}
                </div>
                {distance !== 0 && (
                    <button
                        className={cx('prev-btn')}
                        style={{
                            width: `calc(${padding}px - ${marginRight}px)`,
                        }}
                        onClick={handlePrev}
                    >
                        <FontAwesomeIcon
                            className={cx('icon-control')}
                            icon={faChevronLeft}
                        />
                    </button>
                )}
                <button
                    className={cx('next-btn')}
                    style={
                        nextBtn
                            ? { width: `calc(${padding}px + ${SCROLLWIDTH}px)` }
                            : { width: `${padding}px` }
                    }
                    onClick={handleNext}
                >
                    <FontAwesomeIcon
                        className={cx('icon-control')}
                        icon={faChevronRight}
                    />
                </button>
            </div>
            <div className={cx('slide-indecator')}>
                {dataTrending.map((slide, index) => {
                    if (index === 0 || index % itemsToShow === 0) {
                        return (
                            <div
                                key={index}
                                className={cx('dot-indecator', {
                                    active:
                                        Math.floor(index / itemsToShow) ===
                                        currentPage,
                                })}
                            />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Slider
