/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import styles from './MenuModal.module.scss'
import Avatar from '~/components/Avatar'
import { AuthContext } from '~/components/Auth'
import { images } from '~/assets/media'

const cx = classNames.bind(styles)

function MenuModal({ isShowing, hide }) {
    const { setAuth } = useContext(AuthContext)

    useEffect(() => {
        if (isShowing) document.body.style.overflowY = 'hidden'
        else if (!isShowing) document.body.style.overflowY = 'scroll'
    }, [isShowing])

    const handleLogout = () => {
        setAuth(false)
        window.localStorage.setItem('MY_APP_STATE', false)
    }
    return (
        isShowing &&
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} onClick={hide} />
                <div className={cx('wrapper')}>
                    <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('account-items')}>
                            <div className={cx('avatar-name')}>
                                <Avatar className={cx('avatar')} alt="avatar" src={images.fakeAvatar} />
                                <span className={cx('profile-name')}>
                                    Trang Nguyen <br />
                                    <a className={cx('switch-profile')}>Switch Profiles</a>
                                </span>
                            </div>
                            <ul className={cx('menu-items')}>
                                <li className={cx('menu-item')}>
                                    <a className={cx('profile-link')} href="#" alt="profile">
                                        Manage Profiles
                                    </a>
                                </li>
                                <li className={cx('menu-item')}>
                                    <a className={cx('profile-link')} href="#" alt="profile">
                                        Transfer Profiles
                                    </a>
                                </li>
                                <li className={cx('menu-item')}>
                                    <a className={cx('profile-link')} href="#" alt="profile">
                                        Account
                                    </a>
                                </li>
                                <li className={cx('menu-item')}>
                                    <a className={cx('profile-link')} href="#" alt="profile">
                                        Help Center
                                    </a>
                                </li>
                                <li className={cx('signout')}>
                                    <div onClick={handleLogout} className={cx('profile-signout')}>
                                        Sign out of Netflix
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body,
        )
    )
}

export default MenuModal
