import {
    faVolumeHigh,
    faVolumeMute,
    faArrowRotateRight,
    faPlay,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import ReactPlayer from 'react-player/youtube'

import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'
import styles from './TopBackground.module.scss'
import Button from '~/components/Button'
import Slider from '../Slider'

const cx = classNames.bind(styles)

function TopBackground() {
    const location = useLocation()
    const [dataBg, setDataBg] = useState([])
    const [trailer, setTrailer] = useState([])
    const [autoPlay, setAutoPlay] = useState(true)
    const [muted, setMuted] = useState(true)
    const [opacity, setOpacity] = useState(false)
    const [path, setPath] = useState('all')
    const videoRef = useRef()

    // Handle get id trailer
    useEffect(() => {
        const fecthTrailer = async () => {
            if (dataBg.id) {
                try {
                    await request(`/movie/${dataBg.id}/videos`).then((res) => {
                        if (res !== []) {
                            const trailer = res.find(
                                (trailer) =>
                                    trailer.type === 'Trailer' ||
                                    trailer.type === 'Teaser',
                            )
                            setTrailer(trailer.key)
                        }
                    })
                } catch (error) {
                    setTrailer('')
                    // throw new Error()
                }
            }
        }
        fecthTrailer()
    }, [dataBg])

    // Handle get background id
    useLayoutEffect(() => {
        const fecthImage = async () => {
            await request(`/trending/${path}/week`).then((res) => {
                setDataBg(res[0])
            })
        }
        fecthImage()
    }, [path])

    useLayoutEffect(() => {
        if (location.pathname === '/browse') {
            setPath('all')
        } else if (location.pathname === '/genre') {
            setPath('tv')
        } else if (location.pathname === '/movies') {
            setPath('movie')
        }

        const timerOpacity = setTimeout(() => {
            setOpacity(true)
        }, 4000)

        return () => clearTimeout(timerOpacity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const onProgress = () => {
        if (videoRef.current.getCurrentTime() >= 25) {
            setOpacity(false)
            setAutoPlay(false)
        }
    }

    const onReady = (e) => {
        videoRef.current.seekTo(0, 'seconds')
    }
    return (
        <div className={cx('background-wrapper')}>
            {trailer && (
                <ReactPlayer
                    ref={videoRef}
                    className={cx('trailer')}
                    onProgress={onProgress}
                    onReady={onReady}
                    playing={autoPlay}
                    volume={0.5}
                    muted={muted}
                    width={'auto'}
                    height={'1280px'}
                    url={`http://www.youtube.com/embed/${trailer}`}
                />
            )}

            <Backdrop
                className={cx('background', {
                    opacity: trailer ? opacity : false,
                })}
                large
                path={dataBg.backdrop_path}
            ></Backdrop>

            <div className={cx('more-info')}>
                <h1 className={cx('title')}>{dataBg.name || dataBg.title}</h1>
                <p className={cx('overview')}>{dataBg.overview}</p>
                <div className={cx('button')}>
                    <Button
                        className={cx('play-btn')}
                        leftIcon={
                            <FontAwesomeIcon
                                className={cx('play-icon')}
                                icon={faPlay}
                            />
                        }
                    >
                        Play
                    </Button>
                    <Button
                        className={cx('info-btn')}
                        leftIcon={
                            <FontAwesomeIcon
                                className={cx('info-icon')}
                                icon={faCircleInfo}
                            />
                        }
                    >
                        More Info
                    </Button>
                </div>
            </div>

            <div className={cx('control-layer')}>
                {opacity
                    ? trailer && (
                          // Volume button
                          <button
                              className={cx('control-btn')}
                              onClick={() => setMuted(!muted)}
                          >
                              <FontAwesomeIcon
                                  className={cx('icon-ctl')}
                                  icon={!muted ? faVolumeHigh : faVolumeMute}
                              />
                          </button>
                      )
                    : !autoPlay && (
                          // Replay button
                          <button
                              className={cx('control-btn')}
                              onClick={() => {
                                  videoRef.current.seekTo(0, 'seconds')
                                  setOpacity(true)
                                  setAutoPlay(true)
                              }}
                          >
                              <FontAwesomeIcon
                                  className={cx('icon-ctl')}
                                  icon={faArrowRotateRight}
                              />
                          </button>
                      )}
                <span className={cx('maturity-rating')}>
                    <span className={cx('maturity-number')}>16+</span>
                </span>
            </div>

            <div className={cx('trending')}>
                <Slider
                    path={`/trending/${path}/week`}
                    title={'Trending On Netflix'}
                />
            </div>
        </div>
    )
}

export default TopBackground
