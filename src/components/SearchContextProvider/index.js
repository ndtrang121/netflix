import { useState, createContext } from 'react'

export const SearchContext = createContext()

const SearchContextProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [result, setResult] = useState([])

    return (
        <SearchContext.Provider
            value={{
                searchInput,
                setSearchInput,
                showInput,
                setShowInput,
                result,
                setResult,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider
