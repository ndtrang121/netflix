/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRe } from '@fortawesome/free-regular-svg-icons'

import styles from './MiniModalMovie.module.scss'
import Backdrop from '../Backdrop'
import getGenre from '~/utils/getGenre'
import { MiniModalContext } from '~/providers/MiniModalProvider'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'

const cx = classNames.bind(styles)

function MiniModalMovie() {
    const {
        infoMovie,
        setInfoMovie,
        showModal,
        setShowModal,
        leftItem,
        topItem,
        position,
    } = useContext(MiniModalContext)

    const { itemWidth } = useContext(ResponsiveContext)
    const refInfo = useRef()
    const [heightInfo, setHeightInfo] = useState(0)
    const [dataGenre, setDataGenre] = useState([])
    useLayoutEffect(() => {
        if (refInfo.current) {
            setHeightInfo(refInfo.current.clientHeight)
        }
    })

    useLayoutEffect(() => {
        try {
            const fetchGenre = async () => {
                if (showModal) {
                    await getGenre(
                        infoMovie.genre_ids,
                        infoMovie.media_type,
                    ).then((res) => setDataGenre(res))
                } else setDataGenre([])
            }

            fetchGenre()
        } catch (error) {}
    }, [showModal])

    const handleOffPopup = useCallback(() => {
        setShowModal(false)
        setInfoMovie({})
    }, [])
    return (
        <div
            className={cx('popup-movie', { show: showModal })}
            style={{
                width: `${itemWidth * 1.5}px`,
                left: `${leftItem}px`,
                top: `${
                    topItem -
                    ((itemWidth / 1.777) * 1.5 +
                        heightInfo -
                        itemWidth / 1.777) /
                        2
                }px`,
                transformOrigin: `${position}% 50%`,
            }}
            onMouseLeave={handleOffPopup}
            // onBlur={handleOffPopup}
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
                    </div>
                    <div className={cx('btn-more', { 'btn-control': true })}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
                <div className={cx('meta-data')}>
                    <div className={cx('match')}>97% Match</div>
                    <div className={cx('runtime')}>1h58m</div>
                </div>
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

export default MiniModalMovie
