import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import classNames from 'classnames/bind'
import styles from './Watch.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import request from '~/utils/request'

const cx = classNames.bind(styles)

function Watch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { movieType, movieId } = useParams()
    const navigate = useNavigate()
    const [trailer, setTrailer] = useState('')

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                await request(`/${movieType}/${movieId}/videos`).then((res) => {
                    if (res.results.length !== 0) {
                        const trailer = res.results.find(
                            (trailer) => trailer.type === 'Trailer' || trailer.type === 'Teaser',
                        )
                        trailer ? setTrailer(trailer.key) : setTrailer(res.results[0].key)
                        setSearchParams({ v: `${trailer.key}` })
                    }
                })
            } catch (error) {
                setTrailer('')
            }
        }
        !searchParams.get('v') && fetchTrailer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={cx('wrapper')}>
            <button className={cx('back-btn')} onClick={() => (trailer ? navigate(-2) : navigate(-1))}>
                <FontAwesomeIcon className={cx('back-icon')} icon={faArrowLeftLong} />
            </button>
            <ReactPlayer
                className={cx('movie')}
                playing={true}
                volume={1}
                muted={true}
                width={'100%'}
                height={'100vh'}
                url={`http://www.youtube.com/embed/${searchParams.get('v') || trailer}`}
                controls={true}
            />
        </div>
    )
}

export default Watch
