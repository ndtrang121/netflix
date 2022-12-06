import classNames from 'classnames/bind'
import Footer from '../components/Footer'

import Header from '../components/Header'
import MiniModalMovie from '../components/MiniModalMovie'
import styles from './NotTrailer.module.scss'

const cx = classNames.bind(styles)

function NotTrailer({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
            <MiniModalMovie />
        </div>
    )
}

export default NotTrailer
