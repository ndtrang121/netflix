import classNames from 'classnames/bind'

import { Fragment, useCallback, useContext, useRef, useState } from 'react'

import styles from './Movie.module.scss'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'
import Backdrop from '~/components/Backdrop'
import { MiniModalContext } from '~/providers/MiniModalProvider'

const cx = classNames.bind(styles)

function Movie({ data }) {
    const {
        widthWin,
        SCROLLWIDTH,
        itemWidth,
        itemsToShow,
        marginRight,
        padding,
    } = useContext(ResponsiveContext)

    const {
        setInfoMovie,
        showModal,
        setShowModal,
        setLeftItem,
        setTopItem,
        setPosition,
    } = useContext(MiniModalContext)

    const [timer, setTimer] = useState(null)
    const refMovie = useRef()

    const handleOnPopup = useCallback(
        (data) => {
            setTopItem(
                refMovie.current.getBoundingClientRect().top +
                    document.documentElement.scrollTop,
            )
            const clientX = window.event.clientX
            if (
                clientX >= padding - 1 &&
                clientX < widthWin - padding - SCROLLWIDTH - 1
            ) {
                if (!timer && !showModal) {
                    setTimer(
                        setTimeout(() => {
                            setShowModal(true)
                            setInfoMovie(data)
                            setTimer()
                        }, 700),
                    )
                } else if (showModal) {
                    setShowModal(true)
                    setInfoMovie(data)
                }
            }

            for (let i = 1; i <= itemsToShow; i++) {
                const leftItem =
                    padding +
                    (itemWidth + marginRight) * itemsToShow -
                    (itemWidth + marginRight) * (itemsToShow - (i - 1)) -
                    marginRight
                const rightItem =
                    padding +
                    (itemWidth + marginRight) * itemsToShow -
                    (itemWidth + marginRight) * (itemsToShow - i) -
                    marginRight

                if (clientX >= leftItem && clientX < rightItem) {
                    if (i === 1) {
                        // first item
                        setPosition(0)
                        setLeftItem(leftItem + marginRight)
                    } else if (i === itemsToShow) {
                        // last item
                        setPosition(100)
                        setLeftItem(leftItem + marginRight - itemWidth / 2)
                    } else {
                        setPosition(50)
                        setLeftItem(
                            leftItem +
                                marginRight -
                                (itemWidth * 1.5 - itemWidth) / 2,
                        )
                    }
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [itemWidth, refMovie],
    )

    const handleClearTimer = useCallback(() => {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
    }, [timer])

    return (
        <Fragment>
            <div
                ref={refMovie}
                className={cx('trending-item')}
                style={{ marginRight: `${marginRight}px` }}
                onMouseOver={() => handleOnPopup(data)}
                onMouseOut={handleClearTimer}
                onClick={() => handleOnPopup(data)}
            >
                <Backdrop
                    style={{
                        width: `${itemWidth}px`,
                        height: `${itemWidth / 1.777}px`,
                    }}
                    className={cx('trending-bg')}
                    path={data.backdrop_path || data.poster_path}
                />
            </div>
        </Fragment>
    )
}

export default Movie
