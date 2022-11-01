/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightArrowLeft,
    faBell,
} from '@fortawesome/free-solid-svg-icons'
import {
    faCircleQuestion,
    faUser,
    faPenToSquare,
} from '@fortawesome/free-regular-svg-icons'

import styles from './Header.module.scss'
import { images, Logo } from '~/assets/media'
import { loginRoutes } from '~/routes'
import Avatar from '~/components/Avatar'
import Search from '../Search'
import { AuthContext } from '~/components/Auth'

const cx = classNames.bind(styles)

function Header({ className }) {
    const { setAuth } = useContext(AuthContext)
    const location = useLocation()

    const handleLogout = () => {
        setAuth(false)
        window.localStorage.setItem('MY_APP_STATE', false)
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

    return (
        <div
            className={cx('wrapper', {
                [className]: className,
                visible: visibleHeader,
            })}
            style={{ padding: '0 var(--PADDING)' }}
        >
            <nav className={cx('primary-nav')}>
                <Link className={cx('logo-link')} to="/browse">
                    <Logo className={cx('logo')} />
                </Link>
                <ul className={cx('nav-items')}>
                    {loginRoutes.map((route, index) => {
                        if (index === loginRoutes.length - 1) {
                            // eslint-disable-next-line array-callback-return
                            return
                        }
                        return (
                            <li className={cx('nav-item')} key={index}>
                                <Link
                                    className={cx('nav-item-link', {
                                        active:
                                            location.pathname === route.path,
                                    })}
                                    to={route.path}
                                >
                                    {route.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
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
                        <ul className={cx('notifycations')}>
                            <li className={cx('emty-notify')}>
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
                            src={images.fakeAvatar}
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
        </div>
    )
}

export default Header
