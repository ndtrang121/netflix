import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import styles from './PreviewModal.module.scss'
import Trailer from '../Trailer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function PreviewModal({ isShowing, hide, infoMovie }) {
    useLayoutEffect(() => {
        if (isShowing) document.body.style.overflow = 'hidden'
        else if (!isShowing) document.body.style.overflow = 'unset'
    }, [isShowing])
    return (
        isShowing &&
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} />
                <div className={cx('wrapper')}>
                    <div className={cx('modal')}>
                        <div
                            className={cx('trailer')}
                            style={{
                                width: '850px',
                                height: 'calc(850px / 1.77)',
                            }}
                        >
                            <Trailer
                                widthTrailer={850}
                                heightTrailer={850 / 1.77}
                                infoMovie={infoMovie}
                                delay={2000}
                                large
                                preview
                                hidePreview={hide}
                            />
                        </div>
                        <button
                            type="button"
                            className={cx('close-button')}
                            onClick={hide}
                        >
                            <FontAwesomeIcon
                                className={cx('close-icon')}
                                icon={faXmark}
                            />
                        </button>
                        <p>Hello, I'm a modal.</p>
                    </div>
                </div>
            </React.Fragment>,
            document.body,
        )
    )
}

export default PreviewModal
