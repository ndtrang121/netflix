import React, { useCallback, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import styles from './MiniPreviewModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import request from '~/utils/request'
import Backdrop from '~/components/Backdrop'
import { Link } from 'react-router-dom'
import {
    faChevronRight,
    faExclamationCircle,
    faPlay,
    faPlayCircle,
} from '@fortawesome/free-solid-svg-icons'
import AddList from '~/components/AddList'

const cx = classNames.bind(styles)

function MiniPreviewModal({ isShowing, hide, infoMovie }) {
    const [detail, setDetail] = useState([])
    const [trailer, setTrailer] = useState('')

    const fetchDetail = useCallback(async () => {
        const dataDetail = await request(
            `/${infoMovie.media_type}/${infoMovie.id}`,
        ).then((res) => {
            return res
        })
        return dataDetail
    }, [infoMovie])
    const fetchTrailer = useCallback(async () => {
        const data = await request(
            `/${infoMovie.media_type}/${infoMovie.id}/videos`,
        ).then((res) => {
            if (res.results.length !== 0) {
                const trailer = res.results.find(
                    (trailer) =>
                        trailer.type === 'Trailer' || trailer.type === 'Teaser',
                )
                if (trailer) return trailer.key
                else return res.results[0].key
            }
        })
        return data
    }, [infoMovie])

    useLayoutEffect(() => {
        if (isShowing) document.body.style.overflowY = 'hidden'
        else if (!isShowing) document.body.style.overflowY = 'scroll'

        isShowing &&
            Promise.all([fetchTrailer(), fetchDetail()])
                .then((res) => {
                    setTrailer(res[0])
                    setDetail(res[1])
                })
                .catch((e) => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowing])

    return (
        isShowing &&
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} onClick={hide} />
                <div
                    className={cx('modal')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cx('movie')}>
                        <Backdrop
                            className={cx('poster')}
                            path={detail.poster_path}
                        />
                        <div className={cx('movie-info')}>
                            <h2>{detail.name || detail.title}</h2>
                            <div className={cx('release')}>
                                <p>
                                    {detail.release_date &&
                                        detail.release_date.slice(0, 4)}
                                    {detail.first_air_date &&
                                        detail.first_air_date.slice(0, 4)}
                                </p>
                                <p>16+</p>
                                <p className={cx('runtime')}>
                                    {infoMovie.media_type === 'movie' ? (
                                        <>
                                            {Math.floor(detail.runtime / 60)}h{' '}
                                            {detail.runtime -
                                                Math.floor(
                                                    detail.runtime / 60,
                                                ) *
                                                    60}
                                            m
                                        </>
                                    ) : detail.number_of_seasons > 1 ? (
                                        <>{detail.number_of_seasons} Parts</>
                                    ) : (
                                        <>
                                            {detail.number_of_episodes} Episodes
                                        </>
                                    )}
                                </p>
                            </div>
                            <p className={cx('overview')}>{detail.overview}</p>
                        </div>
                    </div>
                    <div className={cx('controls')}>
                        <div className={cx('btn-control')}>
                            <Link
                                className={cx('btn-play')}
                                to={`/watch/${infoMovie.media_type}/${infoMovie.id}?v=${trailer}`}
                            >
                                <FontAwesomeIcon
                                    className={cx('icon-play')}
                                    icon={faPlayCircle}
                                />
                            </Link>
                            <p>Play</p>
                        </div>
                        <div className={cx('btn-control')}>
                            <AddList id={infoMovie.id} />
                            <p>My List</p>
                        </div>
                        <div className={cx('btn-control')}>
                            <AddList id={infoMovie.id} favorite />
                            <p>Like</p>
                        </div>
                    </div>
                    <div className={cx('info-detail')}>
                        <div>
                            <FontAwesomeIcon
                                className={cx('icon-detail')}
                                icon={faExclamationCircle}
                            />
                            <p>
                                {infoMovie.media_type === 'movie'
                                    ? 'Detail & Info'
                                    : detail.number_of_seasons > 1
                                    ? 'Parts & Info'
                                    : 'Episodes & Info'}
                            </p>
                        </div>
                        <FontAwesomeIcon
                            className={cx('icon-detail')}
                            icon={faChevronRight}
                        />
                    </div>
                </div>
            </React.Fragment>,
            document.body,
        )
    )
}

export default MiniPreviewModal
