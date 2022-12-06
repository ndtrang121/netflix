import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

const NotFound = () => (
    <div className={cx('not-found')}>
        <h1 className={cx('title')}>Lost your way?</h1>
        <p className={cx('zoom-area')}>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
        <section className={cx('error-container')}>
            <span className={cx('four')}>
                <span className={cx('screen-reader-text')}>4</span>
            </span>
            <span className={cx('zero')}>
                <span className={cx('screen-reader-text')}>0</span>
            </span>
            <span className={cx('four')}>
                <span className={cx('screen-reader-text')}>4</span>
            </span>
        </section>
        <div className={cx('link-container')}>
            <Link to={'/browse'} className={cx('more-link')}>
                Netflix Home
            </Link>
        </div>
    </div>
)

export default NotFound
