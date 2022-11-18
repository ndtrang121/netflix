import { memo, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faPlus,
    // eslint-disable-next-line no-unused-vars
    faHeart as faHeartSo,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRe } from '@fortawesome/free-regular-svg-icons'

import styles from './MiniModalMovie.module.scss'
import Backdrop from '../Backdrop'
import getGenre from '~/utils/getGenre'

const cx = classNames.bind(styles)

function MiniModalMovie({
    style,
    position,
    infoMovie,
    itemWidth,
    leftItem,
    show = false,
    ...passProps
}) {
    const refInfo = useRef()
    const [heightInfo, setHeightInfo] = useState(0)
    const [dataGenre, setDataGenre] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (refInfo.current) {
            setHeightInfo(refInfo.current.clientHeight)
        }
    })

    useLayoutEffect(() => {
        try {
            const fetchGenre = async () => {
                if (show) {
                    await getGenre(
                        infoMovie.genre_ids,
                        infoMovie.media_type,
                    ).then((res) => setDataGenre(res))
                } else setDataGenre([])
            }

            fetchGenre()
        } catch (error) {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return (
        <div
            className={cx('popup-movie', { show })}
            {...passProps}
            style={{
                width: `${itemWidth * 1.5}px`,
                left: `${leftItem}px`,
                bottom: `calc((${itemWidth / 1.777}px - ${
                    (itemWidth / 1.777) * 1.5 + heightInfo
                }px) / 2 )`,
                transformOrigin: `${position}% 50%`,
            }}
        >
            <Backdrop
                style={{
                    width: `${itemWidth * 1.5}px`,
                    height: `${(itemWidth / 1.777) * 1.5}px`,
                }}
                path={infoMovie.backdrop_path}
            />
            <div ref={refInfo} className={cx('info')}>
                <div className={cx('btn-controls')}>
                    <div className={cx('btn-play', { 'btn-control': true })}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className={cx('btn-add', { 'btn-control': true })}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className={cx('btn', { 'btn-control': true })}>
                        <FontAwesomeIcon icon={faHeartRe} />
                        {/* <FontAwesomeIcon icon={faHeartSo} /> */}
                    </div>
                    <div className={cx('btn-more', { 'btn-control': true })}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
                <div className={cx('meta-data')}>Match</div>
                <div className={cx('genre')}>
                    {dataGenre.map((genre, index) => (
                        <div className={cx('genre-item')} key={index}>
                            {genre}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(MiniModalMovie)
