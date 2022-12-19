import { useContext, Fragment } from 'react'
import classNames from 'classnames/bind'

import styles from './Search.module.scss'
import { SearchContext } from '~/components/SearchContextProvider'
import Header from '~/layouts/components/Header'
import MiniModalMovie from '~/layouts/components/MiniModalMovie'
import Movie from '~/layouts/components/Movie'
import Footer from '~/layouts/components/Footer'

const cx = classNames.bind(styles)

function Search() {
    const { result } = useContext(SearchContext)

    return (
        <Fragment>
            <Header />
            <div
                style={{ marginLeft: 'var(--PADDING)' }}
                className={cx('suggest-container')}
            >
                <span className={cx('suggest')}>
                    Explore titles related to:
                </span>
                <ul>
                    {result.slice(0, 9).map((data, index) => {
                        if (!data.backdrop_path) return null
                        return (
                            <li className={cx('suggest-title')} key={index}>
                                <p>{data.title || data.name}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <ul
                className={cx('container')}
                style={{ margin: 'var(--PADDING)' }}
            >
                {result.map((data, index) => {
                    if (!data.backdrop_path) return null
                    return (
                        <li className={cx('list-item')} key={index}>
                            <Movie data={data}></Movie>
                        </li>
                    )
                })}
            </ul>
            <Footer />
            <MiniModalMovie />
        </Fragment>
    )
}

export default Search
