import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading({ height, className }) {
    return (
        <div
            className={cx('wrapper', { [className]: className })}
            style={{ height: `${height}px` }}
        >
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
        </div>
    )
}

export default Loading
