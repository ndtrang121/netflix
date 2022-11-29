import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Loading.module.scss'

function Loading({ height }) {
    return (
        <div className={styles.wrapper} style={{ height: `${height}px` }}>
            <FontAwesomeIcon className={styles.loading} icon={faSpinner} />
        </div>
    )
}

export default Loading
