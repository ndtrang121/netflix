import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './SimilarMovie.module.scss'
import request from '~/utils/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import SimilarItem from './SimilarItem'

const cx = classNames.bind(styles)

function SimilarMovie({ infoMovie }) {
    const [recommend, setRecommend] = useState([])
    const [more, setMore] = useState(false)

    const fetchMoreLike = useCallback(async () => {
        const data = await request(`/${infoMovie.media_type}/${infoMovie.id}/similar`).then((res) => {
            console.log(res.results)
            setRecommend(res.results)
        })
        return data
    }, [infoMovie])

    useEffect(() => {
        fetchMoreLike()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        recommend.length !== 0 && (
            <div className={cx('similar')}>
                <h1 className={cx('similar-header')}>More Like This</h1>
                <div className={cx('similar-movies')}>
                    {recommend.length !== 0 &&
                        recommend
                            .slice(0, more ? 21 : 6)
                            .map(
                                (item, index) =>
                                    item.backdrop_path && (
                                        <SimilarItem key={index} item={item} typeDuration={infoMovie.media_type} />
                                    ),
                            )}
                </div>
                <div className={cx('more')}>
                    <div className={cx('more-btn')} onClick={() => setMore(!more)}>
                        <FontAwesomeIcon className={cx('more-icon')} icon={!more ? faAngleDown : faAngleUp} />
                    </div>
                </div>
            </div>
        )
    )
}

export default SimilarMovie
