import classNames from 'classnames/bind'

import Header from '../components/Header'
import TopBackground from '../components/TopBackground'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <TopBackground />
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default DefaultLayout
