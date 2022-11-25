import {
    faVolumeHigh,
    faVolumeMute,
    faArrowRotateRight,
    faPlay,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import ReactPlayer from 'react-player/youtube'

import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'
import styles from './Trailer.module.scss'
import Button from '~/components/Button'
import { MiniModalContext } from '~/providers/MiniModalProvider'

const cx = classNames.bind(styles)

function Trailer({
    infoMovie,
    heightTrailer,
    widthTrailer,
    delay = 3000,
    large = false,
    preview = false,
}) {
    const [trailer, setTrailer] = useState('')
    const [autoPlay, setAutoPlay] = useState(true)
    const [muted, setMuted] = useState(true)
    const [opacity, setOpacity] = useState(false)
    const videoRef = useRef()

    const { showPopup } = useContext(MiniModalContext)

    // Handle get id trailer
    useLayoutEffect(() => {
        const fetchTrailer = async () => {
            if (infoMovie.id) {
                try {
                    await request(
                        `/${infoMovie.media_type}/${infoMovie.id}/videos`,
                    ).then((res) => {
                        if (res.results !== []) {
                            const trailer = res.results.find(
                                (trailer) =>
                                    trailer.type === 'Trailer' ||
                                    trailer.type === 'Teaser',
                            )
                            setTrailer(trailer.key)
                        }
                    })
                } catch (error) {
                    setTrailer('')
                }
            }
        }
        fetchTrailer()
    }, [infoMovie])

    useLayoutEffect(() => {
        setOpacity(false)
        setAutoPlay(true)
        if (videoRef.current) videoRef.current.seekTo(0, 'seconds')

        const timerOpacity = setTimeout(() => {
            setOpacity(true)
        }, delay)

        return () => clearTimeout(timerOpacity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoMovie])

    const onProgress = () => {
        if (
            trailer === '' ||
            (videoRef.current && videoRef.current.getCurrentTime() >= 20)
        ) {
            setOpacity(false)
            setAutoPlay(false)
        }

        if (!large && !showPopup) {
            setOpacity(false)
            setAutoPlay(false)
            setMuted(true)
        }
    }
    const onReady = (e) => {
        if (trailer !== '' && videoRef.current)
            videoRef.current.seekTo(0, 'seconds')
    }

    return (
        <Fragment>
            {trailer !== '' && (
                <ReactPlayer
                    ref={videoRef}
                    className={cx('trailer')}
                    onProgress={onProgress}
                    onReady={onReady}
                    onEnded={() => {
                        setOpacity(false)
                        setAutoPlay(false)
                    }}
                    playing={autoPlay}
                    volume={0.5}
                    muted={muted}
                    width={widthTrailer}
                    height={heightTrailer}
                    url={`http://www.youtube.com/embed/${trailer}`}
                />
            )}

            <Backdrop
                className={cx('background', {
                    opacity: trailer ? opacity : false,
                })}
                large={large}
                path={infoMovie.backdrop_path}
            ></Backdrop>

            {large ? (
                <div className={cx('more-info', { preview })}>
                    <h1 className={cx('title')}>
                        {infoMovie.name || infoMovie.title}
                    </h1>

                    <p className={cx('overview', { disable: preview })}>
                        {infoMovie.overview}
                    </p>
                    <div className={cx('button', { preview })}>
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
                            className={cx('info-btn', { disable: preview })}
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
            ) : (
                <h1 className={cx('title-mini')}>
                    {infoMovie.name || infoMovie.title}
                </h1>
            )}

            <div
                className={cx('control-layer', {
                    'mini-modal': !large,
                    preview,
                })}
            >
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
                {large && (
                    <span
                        className={cx('maturity-rating', { disable: preview })}
                    >
                        <span className={cx('maturity-number')}>16+</span>
                    </span>
                )}
            </div>
        </Fragment>
    )
}

export default Trailer
