import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeMute, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import Backdrop from '~/components/Backdrop'
import request from '~/utils/request'
import Header from '../components/Header'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const [pathBackground, setPathBackground] = useState('')
    const [idBackground, setIdBackground] = useState('')
    const [linkTrailer, setLinkTrailer] = useState('')
    const [autoPlay, setAutoPlay] = useState(true)
    const [muted, setMuted] = useState(true)

    const [opacity, setOpacity] = useState(false)

    const [visibleHeader, setVisibleHeader] = useState(false)

    const videoRef = useRef()

    useEffect(() => {
        const fecthTrailer = async () => {
            if (idBackground) {
                await request(`/movie/${idBackground}/videos`).then((res) => {
                    setLinkTrailer(res[1].key || res[0].key || '')
                })
            }
        }
        fecthTrailer()
    }, [idBackground])

    useLayoutEffect(() => {
        const fecthImage = async () => {
            await request('/trending/all/week').then((res) => {
                setPathBackground(res[7].backdrop_path)
                setIdBackground(res[7].id)
            })
        }
        fecthImage()

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setVisibleHeader(true)
            } else {
                setVisibleHeader(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        const timerOpacity = setTimeout(() => {
            setOpacity(true)
        }, 4000)

        //cleanup function
        return () => {
            clearTimeout(timerOpacity)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const onProgress = () => {
        if (videoRef.current.getCurrentTime() >= 60) {
            setOpacity(false)
            setAutoPlay(false)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Header className={cx({ header: visibleHeader })} />
            <div className={cx('background-wrapper')}>
                <ReactPlayer
                    ref={videoRef}
                    className={cx('trailer')}
                    onProgress={onProgress}
                    playing={autoPlay}
                    volume={0.5}
                    muted={muted}
                    width={'auto'}
                    height={'1280px'}
                    url={`https://www.youtube.com/embed/${linkTrailer}&origin=http://localhost:3001`}
                />
                <Backdrop
                    className={cx('background', { opacity: linkTrailer ? opacity : false })}
                    large
                    path={pathBackground}
                ></Backdrop>

                <div className={cx('control-layer')}>
                    {opacity
                        ? linkTrailer && (
                              // Volume button
                              <button className={cx('control-btn')} onClick={() => setMuted(!muted)}>
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
                                  <FontAwesomeIcon className={cx('icon-ctl')} icon={faArrowRotateRight} />
                              </button>
                          )}
                    <span className={cx('maturity-rating')}>
                        <span className={cx('maturity-number')}>16+</span>
                    </span>
                </div>
            </div>

            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default DefaultLayout
