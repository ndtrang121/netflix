import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import styles from './PreviewModal.module.scss'
import Trailer from '../Trailer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import request from '~/utils/request'

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
    }, [infoMovie])

    const fetchDetail = useCallback(async () => {
        const dataDetail = await request(
            `/${infoMovie.media_type}/${infoMovie.id}`,
        ).then((res) => {
            return res
        })
        return dataDetail
    }, [infoMovie])

    useEffect(() => {
        Promise.all([fetchCast(), fetchDetail()]).then((res) => {
            setCast(res[0].cast)
            setDetail(res[1])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowing])

    useLayoutEffect(() => {
        if (isShowing) document.body.style.overflow = 'hidden'
        else if (!isShowing) document.body.style.overflow = 'unset'
    }, [isShowing])
    return (
        isShowing &&
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} />
                <div className={cx('wrapper')}>
                    <div className={cx('modal')}>
                        <div
                            className={cx('trailer')}
                            style={{
                                width: '850px',
                                height: 'calc(850px / 1.77)',
                            }}
                        >
                            <Trailer
                                widthTrailer={850}
                                heightTrailer={850 / 1.77}
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
                                        href={'#a'}
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
                    </div>
                </div>
            </React.Fragment>,
            document.body,
        )
    )
}

export default PreviewModal
