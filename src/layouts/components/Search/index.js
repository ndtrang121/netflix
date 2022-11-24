/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useLayoutEffect, useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faSpinner,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Search.module.scss'
import { SearchContext } from '~/components/SearchContextProvider'
import { useDebounce } from '~/hooks'
import axios from 'axios'

const cx = classNames.bind(styles)

function Search() {
    const { searchInput, setSearchInput, showInput, setShowInput, setResult } =
        useContext(SearchContext)

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleShow = () => {
        setShowInput(!showInput)
        inputRef.current.focus()
    }

    const handleBlur = () => {
        if (location.pathname !== '/search') {
            setShowInput(false)
            setResult([])
            setSearchInput('')
        }
    }

    const handleInput = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchInput(searchValue)
        }
    }

    const handleClear = () => {
        navigate(-1)
    }

    const debounced = useDebounce(searchInput, 1000)
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        if (!debounced.trim()) {
            setResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)
            try {
                const data = await axios
                    .get(
                        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${debounced}`,
                    )
                    .then((res) => res.data)
                setResult(data.results)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchApi()
    }, [debounced])

    useLayoutEffect(() => {
        if (searchInput && location.pathname !== '/search') {
            navigate('/search')
        }
    })

    useLayoutEffect(() => {
        if (searchInput && location.pathname === '/search') {
            inputRef.current.focus()
        }

        handleBlur()
    }, [])

    return (
        <div
            className={cx('search-wrapper')}
            style={showInput ? { backgroundColor: '#000' } : {}}
        >
            <div className={cx('search-text', { show: showInput })}>
                <FontAwesomeIcon
                    onClick={handleShow}
                    className={cx('search-icon')}
                    icon={faMagnifyingGlass}
                />
                <input
                    value={searchInput}
                    ref={inputRef}
                    className={cx('search-input')}
                    type={'text'}
                    placeholder="Titles, people, genres"
                    onChange={handleInput}
                    onBlur={handleBlur}
                />
                {!!searchInput && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon
                            className={cx('clear-icon')}
                            icon={faXmark}
                        />
                    </button>
                )}

                {loading && (
                    <FontAwesomeIcon
                        className={cx('loading')}
                        icon={faSpinner}
                    />
                )}
            </div>
        </div>
    )
}

export default Search
