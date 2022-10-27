/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind'
import { useLayoutEffect, useRef, useState } from 'react'
import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'

import styles from './Slider.module.scss'

const cx = classNames.bind(styles)

function Slider({ path, page = '1', title }) {
    const [distance, setDistance] = useState(0)
    const [dataTrending, setDataTreding] = useState([])
    const [numberMovies, setNumberMovies] = useState(0)
    const [end, setEnd] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [showIndecator, setShowIndecator] = useState(false)
    const [itemStyle, setItemStyle] = useState({})
    const ref = useRef()
    const itemRef = useRef()

    const itemsToShow = 6
    const pageNumber = Math.ceil(numberMovies / itemsToShow)
    const mod = numberMovies % itemsToShow

    const [width, setWidth] = useState(window.innerWidth)

    // 8px scroll bar
    const [itemWidth, setItemWidth] = useState(
        (width - 120 - 8 - 8 * itemsToShow) / itemsToShow,
    )
    useLayoutEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth)
            setItemWidth(
                (window.innerWidth - 120 - 8 - 8 * itemsToShow) / itemsToShow,
            )
        }

        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    useLayoutEffect(() => {
        setItemStyle({
            width: `${itemWidth}px`,
            height: `${itemWidth / 1.777}px`,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    const handlePrev = () => {
        if (mod !== 0) {
            if (end) {
                setEnd(false)
                setDistance(distance + (itemWidth + 8) * mod)
                setCurrentPage(currentPage - 1)
                return
            }
        }
        setDistance(distance + (itemWidth + 8) * itemsToShow)
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (mod !== 0) {
            if (
                Math.abs(distance) ===
                (itemWidth + 8) * itemsToShow * (pageNumber - 2)
            ) {
                setDistance(distance - (itemWidth + 8) * mod)
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
        setDistance(distance - (itemWidth + 8) * itemsToShow)
        setCurrentPage(currentPage + 1)
    }

    const slideProps = {
        style: { transform: `translateX(${distance}px)` },
    }

    // Handle get data
    useLayoutEffect(() => {
        setDistance(0)
        setCurrentPage(0)
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
    }, [path])

    return (
        <div ref={ref} className={cx('wrapper')}>
            <div className={cx('header')}>
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
                onMouseOver={() => {
                    setShowIndecator(true)
                }}
                onMouseOut={() => {
                    setShowIndecator(false)
                }}
                className={cx('items-control')}
            >
                <div style={slideProps.style} className={cx('trending-items')}>
                    {dataTrending.map((data, index) => (
                        <div key={index} className={cx('trending-item')}>
                            <Backdrop
                                ref={itemRef}
                                style={itemStyle}
                                className={cx('trending-bg')}
                                path={data.backdrop_path || data.poster_path}
                            />
                        </div>
                    ))}
                </div>
                {distance !== 0 && (
                    <button className={cx('prev-btn')} onClick={handlePrev}>
                        <FontAwesomeIcon
                            className={cx('icon-control')}
                            icon={faChevronLeft}
                        />
                    </button>
                )}
                <button className={cx('next-btn')} onClick={handleNext}>
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
