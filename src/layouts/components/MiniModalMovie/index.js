/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import styles from './MiniModalMovie.module.scss'
import getDetail from '~/utils/getDetail'
import { MiniModalContext } from '~/providers/MiniModalProvider'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'
import Trailer from '../Trailer'
import AddList from '~/components/AddList'

const cx = classNames.bind(styles)

function MiniModalMovie() {
    const {
        infoMovie,
        setInfoMovie,
        showPopup,
        setShowPopup,
        leftItem,
        topItem,
        position,
    } = useContext(MiniModalContext)

    const { itemWidth } = useContext(ResponsiveContext)
    const itemHeight = itemWidth / 1.777
    const refInfo = useRef()
    const [heightInfo, setHeightInfo] = useState(0)
    const [detail, setDetail] = useState([])

    useLayoutEffect(() => {
        if (refInfo.current) {
            setHeightInfo(refInfo.current.clientHeight)
        }
    })

    useLayoutEffect(() => {
        const fetchDetail = async () => {
            if (showPopup) {
                try {
                    await getDetail(infoMovie.id, infoMovie.media_type).then(
                        (res) => {
                            setDetail(res)
                        },
                    )
                } catch (error) {
                    setDetail([])
                }
            } else setDetail([])
        }

        fetchDetail()
    }, [infoMovie])

    const handleOffPopup = () => {
        setShowPopup(false)
        setInfoMovie({})
    }
    return (
        showPopup && (
            <div
                className={cx('popup-movie', { show: showPopup })}
                style={{
                    width: `${itemWidth * 1.5}px`,
                    left: `${leftItem}px`,
                    top: `${
                        topItem -
                        (itemHeight * 1.5 + heightInfo - itemHeight) / 2
                    }px`,
                    transformOrigin: `${position}% 50%`,
                }}
                onMouseLeave={handleOffPopup}
                onBlur={handleOffPopup}
            >
                <div
                    className={cx('trailer')}
                    style={{
                        width: `${itemWidth * 1.5}px`,
                        height: `${itemHeight * 1.5}px`,
                    }}
                >
                    <Trailer
                        widthTrailer={itemWidth * 1.5}
                        heightTrailer={itemHeight * 1.5}
                        infoMovie={infoMovie}
                        delay={2000}
                    />
                </div>
                <div ref={refInfo} className={cx('info')}>
                    <div className={cx('btn-controls')}>
                        <div
                            className={cx('btn-play', { 'btn-control': true })}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                        <AddList id={infoMovie.id} hidePreview={setShowPopup} />
                        <AddList id={infoMovie.id} favorite />
                        <div
                            className={cx('btn-more', { 'btn-control': true })}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </div>
                    <div className={cx('meta-data')}>
                        <div className={cx('match')}>
                            {detail.vote_average &&
                                (detail.vote_average * 10).toFixed(0)}
                            {'% '}
                            Match
                        </div>
                        <div className={cx('adult')}>16+</div>

                        <div className={cx('runtime')}>
                            {infoMovie.media_type === 'movie' ? (
                                <>
                                    {Math.floor(detail.runtime / 60)}h{' '}
                                    {detail.runtime -
                                        Math.floor(detail.runtime / 60) * 60}
                                    m
                                </>
                            ) : detail.number_of_seasons > 1 ? (
                                <>{detail.number_of_seasons} Parts</>
                            ) : (
                                <>{detail.number_of_episodes} Episodes</>
                            )}
                        </div>
                        <div className={cx('feature')}>HD</div>
                    </div>
                    <div className={cx('genre')}>
                        {detail.genres &&
                            detail.genres.map((genre, index) => (
                                <div className={cx('genre-item')} key={index}>
                                    {genre.name}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    )
}

export default MiniModalMovie
