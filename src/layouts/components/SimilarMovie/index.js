import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './SimilarMovie.module.scss'
import Backdrop from '~/components/Backdrop'
import AddList from '~/components/AddList'
import request from '~/utils/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faPlay } from '@fortawesome/free-solid-svg-icons'
import Duration from '~/components/Duration'

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
                        recommend.slice(0, more ? 21 : 6).map(
                            (item, index) =>
                                item.backdrop_path && (
                                    <div key={index} className={cx('similar-item')}>
                                        <div className={cx('similar-image')}>
                                            <h3 className={cx('title')}>{item.name || item.title}</h3>
                                            <Duration
                                                className={cx('duration')}
                                                type={infoMovie.media_type}
                                                id={item.id}
                                            />
                                            <Backdrop
                                                path={item.backdrop_path}
                                                style={{
                                                    width: '100%',
                                                    pointerEvents: 'none',
                                                    minHeight: '120px',
                                                }}
                                            />
                                            <div className={cx('play-btn')}>
                                                <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
                                            </div>
                                        </div>
                                        <div className={cx('similar-item-info')}>
                                            <div className={cx('item-data')}>
                                                <div className={cx('data-left')}>
                                                    <div className={cx('item-match')}>
                                                        {item.vote_average && (item.vote_average * 10).toFixed(0)}
                                                        {'% '}
                                                        Match
                                                    </div>
                                                    <div>
                                                        <div className={cx('item-adult')}>16+</div>

                                                        <div className={cx('item-feature')}>HD</div>
                                                    </div>
                                                </div>
                                                <AddList id={item.id} />
                                            </div>
                                            <div className={cx('item-overview')}>{item.overview}</div>
                                        </div>
                                    </div>
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
