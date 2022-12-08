/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import styles from './MiniModalMovie.module.scss'
import getDetail from '~/utils/getDetail'
import { MiniModalContext } from '~/providers/MiniModalProvider'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'
import Trailer from '../Trailer'
import AddList from '~/components/AddList'
import { useModal } from '~/hooks'
import PreviewModal from '../PreviewModal'
import { Link } from 'react-router-dom'
import request from '~/utils/request'

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

    const { itemWidth, touchDevice } = useContext(ResponsiveContext)
    const itemHeight = itemWidth / 1.777
    const refInfo = useRef()
    const [heightInfo, setHeightInfo] = useState(0)
    const [detail, setDetail] = useState([])
    const [trailer, setTrailer] = useState('')

    useLayoutEffect(() => {
        if (refInfo.current) {
            setHeightInfo(refInfo.current.clientHeight)
        }
    })

    const fetchDetail = useCallback(async () => {
        const data = await getDetail(infoMovie.id, infoMovie.media_type).then(
            (res) => {
                return res
            },
        )
        return data
    }, [infoMovie.id])

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
    }, [infoMovie.id])

    useEffect(() => {
        showPopup &&
            Promise.all([fetchDetail(), fetchTrailer()])
                .then((res) => {
                    setDetail(res[0])
                    setTrailer(res[1])
                })
                .catch((e) => {})
    }, [showPopup])

    const handleOffPopup = () => {
        setShowPopup(false)
        setInfoMovie({})
    }

    const { toggle, isShowing } = useModal()

    return (
        !touchDevice && (
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
                        <Link
                            className={cx('btn-play', { 'btn-control': true })}
                            to={`/watch/${infoMovie.media_type}/${infoMovie.id}?v=${trailer}`}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Link>
                        <AddList id={infoMovie.id} hidePreview={setShowPopup} />
                        <AddList id={infoMovie.id} favorite />
                        <div
                            onClick={() => {
                                toggle()
                                setShowPopup(false)
                            }}
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
                <PreviewModal
                    isShowing={isShowing}
                    hide={toggle}
                    infoMovie={infoMovie}
                />
            </div>
        )
    )
}

export default MiniModalMovie
