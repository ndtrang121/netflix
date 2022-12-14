/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import styles from './PreviewModal.module.scss'
import Trailer from '../Trailer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import request from '~/utils/request'
import SimilarMovie from '../SimilarMovie'

const cx = classNames.bind(styles)

function PreviewModal({ isShowing, hide, infoMovie }) {
    const [detail, setDetail] = useState([])
    const [cast, setCast] = useState([])
    const fetchCast = useCallback(async () => {
        const dataCast = await request(
            `/${infoMovie.media_type}/${infoMovie.id}/credits`,
        ).then((res) => {
            return res
        })
        return dataCast
    }, [infoMovie.id])

    const fetchDetail = useCallback(async () => {
        const dataDetail = await request(
            `/${infoMovie.media_type}/${infoMovie.id}`,
        ).then((res) => {
            return res
        })
        return dataDetail
    }, [infoMovie.id])

    useLayoutEffect(() => {
        if (isShowing) document.body.style.overflowY = 'hidden'
        else if (!isShowing) document.body.style.overflowY = 'scroll'

        isShowing &&
            Promise.all([fetchCast(), fetchDetail()])
                .then((res) => {
                    setCast(res[0].cast)
                    setDetail(res[1])
                })
                .catch((e) => {})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowing])

    const [widthPre, setWidthPre] = useState(850)

    useEffect(() => {
        const handleSetWidth = () => {
            if (window.innerWidth <= 900) setWidthPre(500)
            else setWidthPre(850)
        }
        window.addEventListener('resize', handleSetWidth)
        return () => window.removeEventListener('resize', handleSetWidth)
    }, [])

    return (
        isShowing &&
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} />
                <div className={cx('wrapper')} onClick={hide}>
                    <div
                        className={cx('modal')}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className={cx('trailer')}
                            style={{
                                width: `${widthPre}px`,
                                height: `${widthPre / 1.77}px`,
                            }}
                        >
                            <Trailer
                                widthTrailer={widthPre}
                                heightTrailer={widthPre / 1.77}
                                infoMovie={infoMovie}
                                delay={2000}
                                large
                                preview
                                hidePreview={hide}
                            />
                        </div>
                        <button
                            type="button"
                            className={cx('close-button')}
                            onClick={hide}
                        >
                            <FontAwesomeIcon
                                className={cx('close-icon')}
                                icon={faXmark}
                            />
                        </button>
                        <div className={cx('more')}>
                            <div className={cx('more-left')}>
                                <div className={cx('meta-data')}>
                                    <div className={cx('match')}>
                                        {detail.vote_average &&
                                            (detail.vote_average * 10).toFixed(
                                                0,
                                            )}
                                        {'% '}
                                        Match
                                    </div>
                                    <div className={cx('adult')}>16+</div>

                                    <div className={cx('runtime')}>
                                        {infoMovie.media_type === 'movie' ? (
                                            <>
                                                {Math.floor(
                                                    detail.runtime / 60,
                                                )}
                                                h{' '}
                                                {detail.runtime -
                                                    Math.floor(
                                                        detail.runtime / 60,
                                                    ) *
                                                        60}
                                                m
                                            </>
                                        ) : detail.number_of_seasons > 1 ? (
                                            <>
                                                {detail.number_of_seasons} Parts
                                            </>
                                        ) : (
                                            <>
                                                {detail.number_of_episodes}{' '}
                                                Episodes
                                            </>
                                        )}
                                    </div>
                                    <div className={cx('feature')}>HD</div>
                                </div>
                                <div>{detail.overview}</div>
                            </div>
                            <div className={cx('more-right')}>
                                <div className={cx('cast')}>
                                    <span className={cx('cast-title')}>
                                        Cast:{' '}
                                    </span>
                                    {cast &&
                                        cast.slice(0, 4).map((cast, index) => (
                                            <span
                                                key={index}
                                                className={cx('cast-item')}
                                            >
                                                {cast.name}
                                            </span>
                                        ))}
                                    <a
                                        className={cx('cast-more', {
                                            'cast-item': true,
                                        })}
                                        href="#full-cast"
                                    >
                                        more
                                    </a>
                                </div>
                                <div className={cx('genre')}>
                                    <span className={cx('genre-title')}>
                                        Genres:{' '}
                                    </span>
                                    {detail.genres &&
                                        detail.genres.map((genre, index) => (
                                            <span
                                                key={index}
                                                className={cx('genre-item')}
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <SimilarMovie infoMovie={infoMovie} />
                        <div className={cx('about')}>
                            <h2>
                                <span style={{ fontWeight: '400' }}>
                                    About:{' '}
                                </span>{' '}
                                {infoMovie.name || infoMovie.title}
                            </h2>
                            <div className={cx('cast')} id="full-cast">
                                <span className={cx('cast-title')}>Cast: </span>
                                {cast &&
                                    cast.map((cast, index) => (
                                        <span
                                            key={index}
                                            className={cx('cast-item')}
                                        >
                                            {cast.name}
                                        </span>
                                    ))}
                            </div>
                            <div className={cx('genre')}>
                                <span className={cx('genre-title')}>
                                    Genres:{' '}
                                </span>
                                {detail.genres &&
                                    detail.genres.map((genre, index) => (
                                        <span
                                            key={index}
                                            className={cx('genre-item')}
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                            <div className={cx('maturity')}>
                                <span className={cx('maturity-title')}>
                                    Maturity rating:{' '}
                                </span>
                                <div className={cx('adult')}>16+</div>
                                <p className={cx('maturity-description')}>
                                    Recommended for ages 16 and up
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body,
        )
    )
}

export default PreviewModal
