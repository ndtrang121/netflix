import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRe } from '@fortawesome/free-regular-svg-icons'

import styles from './AddList.module.scss'
import checkFavorite from '~/utils/checkFavorite'
import { useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

const session_id = process.env.REACT_APP_SESSION_ID
const api_key = process.env.REACT_APP_API_KEY
const list_id = process.env.REACT_APP_LIST_ID
const favorite_id = process.env.REACT_APP_FAVORITE_ID

function AddList({ id, favorite = false, hidePreview }) {
    const [add, setAdd] = useState(false)
    const [checked, setChecked] = useState(false)
    const location = useLocation()
    useEffect(() => {
        const check = async () => {
            try {
                await checkFavorite(id, favorite).then((res) => {
                    setAdd(!res)
                })
            } catch (error) {
            } finally {
                setChecked(true)
                console.log('checked')
            }
        }
        check()
    }, [id, favorite])
    const handleAddList = useCallback(async () => {
        if (!favorite && location.pathname === '/favorite') hidePreview()
        let state
        if (!add) {
            setAdd(true)
            state = 'remove_item'
        } else {
            setAdd(false)
            state = 'add_item'
        }
        try {
            await axios.post(
                `https://api.themoviedb.org/3/list/${
                    !favorite ? list_id : favorite_id
                }/${state}?api_key=${api_key}&session_id=${session_id}`,
                { media_id: id },
            )
        } catch (error) {
            // console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, add, favorite])

    return (
        checked && (
            <div className={cx('wrapper')} onClick={handleAddList}>
                {!favorite ? (
                    add ? (
                        <FontAwesomeIcon
                            className={cx('icon-add')}
                            icon={faPlus}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className={cx('icon-check')}
                            icon={faCheck}
                        />
                    )
                ) : add ? (
                    <FontAwesomeIcon
                        className={cx('icon-add')}
                        icon={faHeart}
                    />
                ) : (
                    <FontAwesomeIcon
                        className={cx('icon-check')}
                        icon={faHeartRe}
                    />
                )}
            </div>
        )
    )
}

export default AddList
