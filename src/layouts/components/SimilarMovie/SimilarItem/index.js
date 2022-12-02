import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './SimilarItem.module.scss'
import Backdrop from '~/components/Backdrop'
import AddList from '~/components/AddList'
import request from '~/utils/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Duration from '~/components/Duration'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function SimilarItem({ item, typeDuration }) {
    const [trailer, setTrailer] = useState('')

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                await request(`/${typeDuration}/${item.id}/videos`).then((res) => {
                    if (res.results.length !== 0) {
                        const trailer = res.results.find(
                            (trailer) => trailer.type === 'Trailer' || trailer.type === 'Teaser',
                        )
                        trailer ? setTrailer(trailer.key) : setTrailer(res.results[0].key)
                    }
                })
            } catch (error) {
                setTrailer('')
            }
        }
        fetchTrailer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Link className={cx('similar-item')} to={`/watch/${typeDuration}/${item.id}?v=${trailer}`}>
            <div className={cx('similar-image')}>
                <h3 className={cx('title')}>{item.name || item.title}</h3>
                <Duration className={cx('duration')} type={typeDuration} id={item.id} />
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
        </Link>
    )
}

export default SimilarItem
