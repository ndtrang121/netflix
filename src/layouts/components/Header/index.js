import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import { images, Logo } from '~/assets/media'
import { loginRoutes } from '~/routes'
import Avatar from '~/components/Avatar'
import Search from '../Search'

const cx = classNames.bind(styles)

function Header() {
    const location = useLocation()

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('primary-nav')}>
                <Link className={cx('logo-link')} to="/browse">
                    <Logo className={cx('logo')} />
                </Link>
                <ul className={cx('nav-items')}>
                    {loginRoutes.map((route, index) => {
                        if (index === loginRoutes.length - 1) {
                            return 0
                        }
                        return (
                            <li className={cx('nav-item')} key={index}>
                                <Link
                                    className={cx('nav-item-link', {
                                        active: location.pathname === route.path,
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
                    <FontAwesomeIcon className={cx('bell-icon')} icon={faBell} />
                </div>

                <div className={cx('icon-item')}>
                    <div className={cx('account-items')}>
                        <Avatar className={cx('avatar')} alt="avatar" src={images.fakeAvatar} />
                        <span className={cx('arrow-icon')}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
