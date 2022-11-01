import classNames from 'classnames/bind'

import styles from './Movie.module.scss'
import Backdrop from '../Backdrop'

const cx = classNames.bind(styles)

function Movie({ style, className, path }) {
    return (
        <div className={cx('wrapper')}>
            <Backdrop style={style} className={className} path={path} />
            <div className={cx('more')}>
                <Backdrop
                    style={{
                        width: `calc(${style.width} * 1.5)`,
                        height: `calc(${style.height} * 1.5)`,
                    }}
                    path={path}
                />
                <div className={cx('info')}></div>
            </div>
        </div>
    )
}

export default Movie
