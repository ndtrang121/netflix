/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightArrowLeft,
    faBars,
    faBell,
} from '@fortawesome/free-solid-svg-icons'
import {
    faCircleQuestion,
    faUser,
    faPenToSquare,
} from '@fortawesome/free-regular-svg-icons'

import styles from './Header.module.scss'
import { Logo } from '~/assets/media'
import { loginRoutes } from '~/routes'
import Avatar from '~/components/Avatar'
import Search from '../Search'
import MenuModal from '../MenuModal'
import { useModal } from '~/hooks'
import { signOut } from 'firebase/auth'
import { auth } from '~/components/Auth/firebase'

const cx = classNames.bind(styles)

function Header({ className }) {
    const location = useLocation()

    const handleLogout = () => {
        signOut(auth)
    }

    const [visibleHeader, setVisibleHeader] = useState(false)
    // Handle scroll to visible header
    useLayoutEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setVisibleHeader(true)
            } else {
                setVisibleHeader(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        //cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const { isShowing, toggle } = useModal()

    return (
        <div
            className={cx('wrapper', {
                [className]: className,
                visible: visibleHeader,
            })}
            style={{ padding: '0 var(--PADDING)' }}
        >
            <nav className={cx('primary-nav')}>
                <div className={cx('menu-bar')} onClick={toggle}>
                    <FontAwesomeIcon
                        className={cx('menu-bar-icon')}
                        icon={faBars}
                    />
                </div>
                <Link className={cx('logo-link')} to="/browse">
                    <Logo className={cx('logo')} />
                </Link>
                <div className={cx('navigation')}>
                    <div className={cx('nav-list-wrapper')}>
                        <span className={cx('nav-list')}>Browse</span>
                        <span className={cx('arrow-list')}></span>
                    </div>
                    <ul className={cx('nav-items')}>
                        {loginRoutes.map((route, index) => {
                            if (index >= loginRoutes.length - 2) {
                                // eslint-disable-next-line array-callback-return
                                return
                            }
                            return (
                                <li className={cx('nav-item')} key={index}>
                                    <Link
                                        className={cx('nav-item-link', {
                                            active:
                                                location.pathname ===
                                                route.path,
                                        })}
                                        to={route.path}
                                    >
                                        {route.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>

            <div className={cx('icon-nav')}>
                <div className={cx('icon-item')}>
                    <Search />
                </div>
                <div className={cx('icon-item')}>
                    <div className={cx('notify-btn')}>
                        <FontAwesomeIcon
                            className={cx('bell-icon')}
                            icon={faBell}
                        />
                        <ul className={cx('notifications')}>
                            <li className={cx('empty-notify')}>
                                <p>No recent notifications</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={cx('icon-item')}>
                    <div className={cx('account-items')}>
                        <Avatar
                            className={cx('avatar')}
                            alt="avatar"
                            src={auth.currentUser.photoURL}
                        />
                        <span className={cx('arrow-icon')}></span>
                        <ul className={cx('menu-items')}>
                            <li className={cx('menu-item')}>
                                <a
                                    className={cx('profile-link')}
                                    href="#"
                                    alt="profile"
                                >
                                    <FontAwesomeIcon
                                        className={cx('menu-icon')}
                                        icon={faPenToSquare}
                                    />
                                    Manage Profiles
                                </a>
                            </li>
                            <li className={cx('menu-item')}>
                                <a
                                    className={cx('profile-link')}
                                    href="#"
                                    alt="profile"
                                >
                                    <FontAwesomeIcon
                                        className={cx('menu-icon')}
                                        icon={faArrowRightArrowLeft}
                                    />
                                    Transfer Profiles
                                </a>
                            </li>
                            <li className={cx('menu-item')}>
                                <a
                                    className={cx('profile-link')}
                                    href="#"
                                    alt="profile"
                                >
                                    <FontAwesomeIcon
                                        className={cx('menu-icon')}
                                        icon={faUser}
                                    />
                                    Account
                                </a>
                            </li>
                            <li className={cx('menu-item')}>
                                <a
                                    className={cx('profile-link')}
                                    href="#"
                                    alt="profile"
                                >
                                    <FontAwesomeIcon
                                        className={cx('menu-icon')}
                                        icon={faCircleQuestion}
                                    />
                                    Help Center
                                </a>
                            </li>
                            <li className={cx('signout')}>
                                <div
                                    onClick={handleLogout}
                                    className={cx('profile-signout')}
                                >
                                    Sign out of Netflix
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <MenuModal isShowing={isShowing} hide={toggle} />
        </div>
    )
}

export default memo(Header)
