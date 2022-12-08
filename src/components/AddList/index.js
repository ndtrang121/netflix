import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRe } from '@fortawesome/free-regular-svg-icons'

import styles from './AddList.module.scss'
import checkFavorite from '~/utils/checkFavorite'
import { useLocation } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { UpdateListContext } from '~/providers/UpdateListProvider'

const cx = classNames.bind(styles)

const session_id = process.env.REACT_APP_SESSION_ID
const api_key = process.env.REACT_APP_API_KEY
const list_id = process.env.REACT_APP_LIST_ID
const favorite_id = process.env.REACT_APP_FAVORITE_ID

function AddList({ id, favorite = false, hidePreview, className }) {
    const [add, setAdd] = useState(false)
    const [checked, setChecked] = useState(false)
    const location = useLocation()

    const { updateList, setUpdateList } = useContext(UpdateListContext)

    useEffect(() => {
        const check = async () => {
            try {
                await checkFavorite(id, favorite).then((res) => {
                    setAdd(!res)
                })
            } catch (error) {
            } finally {
                setChecked(true)
            }
        }
        check()
        return () => setChecked(false)
    }, [id, favorite])

    const handleAddList = useCallback(async () => {
        if (hidePreview && !favorite && location.pathname === '/favorite')
            hidePreview()
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
        } catch (error) {}
        setUpdateList(!updateList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hidePreview, favorite, location.pathname, add, updateList, id])

    return (
        checked && (
            <Fragment>
                <div
                    data-tip={
                        !favorite
                            ? add
                                ? 'Add to My List'
                                : 'Remove from My List'
                            : 'I like this'
                    }
                    data-place="top, center"
                    data-type="light"
                    data-effect="solid"
                    className={cx('wrapper', { [className]: className })}
                    onClick={handleAddList}
                >
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
                    ) : !add ? (
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
                <ReactTooltip
                    clickable={true}
                    delayShow={300}
                    className={cx('tool-tip')}
                />
            </Fragment>
        )
    )
}

export default AddList
