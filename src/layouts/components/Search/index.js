import { useRef, useLayoutEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { SearchContext } from '~/components/SearchContextProvider'

const cx = classNames.bind(styles)

function Search() {
    const { searchInput, setSearchInput, showInput, setShowInput } = useContext(SearchContext)

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef()

    const handleShow = () => {
        setShowInput(true)
        inputRef.current.focus()
    }

    const handleBlur = () => {
        if (location.pathname !== '/search') {
            setShowInput(false)
            setSearchInput('')
        }
    }

    const handleInput = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchInput(searchValue)
        }
    }

    useLayoutEffect(() => {
        if (searchInput && location.pathname !== '/search') {
            navigate('/search')
            inputRef.current.focus()
        }
    })

    useLayoutEffect(() => {
        if (searchInput && location.pathname === '/search') {
            inputRef.current.focus()
        }

        handleBlur()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={cx('search-wrapper')}>
            <div className={cx('search-text', { show: showInput })}>
                <FontAwesomeIcon onClick={handleShow} className={cx('search-icon')} icon={faMagnifyingGlass} />
                <input
                    value={searchInput}
                    ref={inputRef}
                    className={cx('search-input')}
                    type={'text'}
                    placeholder="Titles, people, genres"
                    onChange={handleInput}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )
}

export default Search
