import { memo, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faPlus,
    faHeart as faHeartSo,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRe } from '@fortawesome/free-regular-svg-icons'

import styles from './MiniModalMovie.module.scss'
import Backdrop from '../Backdrop'

const cx = classNames.bind(styles)

function MiniModalMovie({
    style,
    infoMovie,
    itemWidth,
    leftItem,
    show = false,
    ...passProps
}) {
    const refInfo = useRef()
    const [heightInfo, setHeightInfo] = useState(0)

    useLayoutEffect(() => {
        if (refInfo.current) {
            console.log(refInfo.current.clientHeight)
            setHeightInfo(refInfo.current.clientHeight)
        }
    }, [itemWidth])

    return (
        <div
            className={cx('popup-movie', { show })}
            {...passProps}
            style={{
                left: `${leftItem}px`,
                bottom: `calc((${itemWidth / 1.777}px - ${
                    (itemWidth / 1.777) * 1.5 + heightInfo
                }px) / 2 )`,
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
                    <p>Action</p>
                    <p>Action</p>
                    <p>Action</p>
                </div>
            </div>
        </div>
    )
}

export default memo(MiniModalMovie)
