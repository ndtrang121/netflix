import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from './AddList.module.scss'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import checkFavorite from '~/utils/checkFavorite'

const cx = classNames.bind(styles)

const session_id = process.env.REACT_APP_SESSION_ID
const api_key = process.env.REACT_APP_API_KEY
const list_id = process.env.REACT_APP_LIST_ID

function AddList({ id }) {
    const [state, setState] = useState('')
    const firstRender = useRef('first')
    useEffect(() => {
        async function isFavorite() {
            await checkFavorite(id).then((res) => {
                setState(!res ? 'remove_iem' : 'add_item')
            })
            firstRender.current = 'second'
        }

        async function addItem() {
            try {
                await axios.post(
                    `https://api.themoviedb.org/3/list/${list_id}/${state}?api_key=${api_key}&session_id=${session_id}`,
                    { media_id: id },
                )
            } catch (error) {
                console.log(error)
            }
        }
        if (firstRender.current === 'first') {
            isFavorite()
        } else if (firstRender.current === 'second') {
            firstRender.current = 'third'
        } else if (firstRender.current === 'third') {
            addItem()
        }
    }, [state])

    const handleAddList = () => {
        if (state === 'add_item') setState('remove_item')
        else setState('add_item')
    }

    return (
        <div className={cx('wrapper')} onClick={handleAddList}>
            {state !== 'add_item' ? (
                <div className={cx('btn-add')}>
                    <FontAwesomeIcon className={cx('icon-add')} icon={faPlus} />
                </div>
            ) : (
                <div className={cx('btn-add')}>
                    <FontAwesomeIcon
                        className={cx('icon-add')}
                        icon={faCheck}
                    />
                </div>
            )}
        </div>
    )
}

export default AddList
