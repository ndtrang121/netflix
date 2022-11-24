import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Loading.module.scss'

function Loading() {
    return (
        <div className={styles.wrapper}>
            <FontAwesomeIcon className={styles.loading} icon={faSpinner} />
        </div>
    )
}

export default Loading
