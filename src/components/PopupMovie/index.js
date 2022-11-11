import classNames from 'classnames/bind'

import styles from './Movie.module.scss'
import Backdrop from '../Backdrop'

const cx = classNames.bind(styles)

function PopupMovie({ style, path, ...passProps }) {
    return (
        <div className={cx('wrapper')} {...passProps}>
            <div className={cx('more')}>
                <Backdrop
                    style={{
                        width: `calc(${style.width} * 1.5)`,
                        height: `calc(${style.height} * 1.5)`,
                    }}
                    path={path}
                />
                <div className={cx('info')}>Infor</div>
            </div>
        </div>
    )
}

export default PopupMovie
