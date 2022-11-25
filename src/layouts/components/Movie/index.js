import classNames from 'classnames/bind'

import { Fragment, useCallback, useContext, useRef, useState } from 'react'

import styles from './Movie.module.scss'
import { ResponsiveContext } from '~/providers/ResponsiveProvider'
import Backdrop from '~/components/Backdrop'
import { MiniModalContext } from '~/providers/MiniModalProvider'
import useModal from '~/hooks/useModal'
import PreviewModal from '../PreviewModal'

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
        showPopup,
        setShowPopup,
        setLeftItem,
        setTopItem,
        setPosition,
    } = useContext(MiniModalContext)

    const itemHeight = itemWidth / 1.777
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
                if (!timer && !showPopup) {
                    setTimer(
                        setTimeout(() => {
                            setShowPopup(true)
                            setInfoMovie(data)
                            setTimer()
                        }, 1000),
                    )
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
        [itemWidth, refMovie.current],
    )

    const handleClearTimer = () => {
        if (timer) {
            console.log(timer)
            clearTimeout(timer)
            setTimer(null)
        }
    }

    const { isShowing, toggle } = useModal()
    return (
        <Fragment>
            <div
                ref={refMovie}
                className={cx('trending-item')}
                style={{ marginRight: `${marginRight}px` }}
                onMouseOver={() => handleOnPopup(data)}
                onMouseOut={handleClearTimer}
                onClick={toggle}
            >
                <Backdrop
                    style={{
                        width: `${itemWidth}px`,
                        height: `${itemHeight}px`,
                    }}
                    className={cx('trending-bg')}
                    path={data.backdrop_path || data.poster_path}
                />
            </div>
            <PreviewModal
                isShowing={isShowing}
                hide={toggle}
                infoMovie={data}
            />
        </Fragment>
    )
}

export default Movie
