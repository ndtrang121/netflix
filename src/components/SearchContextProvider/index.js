import { useState, createContext } from 'react'

export const SearchContext = createContext()

const SearchContextProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('')
    const [showInput, setShowInput] = useState(false)
    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput, showInput, setShowInput }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider
