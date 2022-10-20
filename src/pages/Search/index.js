import { useContext } from 'react'
import Backdrop from '~/components/Backdrop'
import { SearchContext } from '~/components/SearchContextProvider'
import Header from '~/layouts/components/Header'

function Search() {
    const { result } = useContext(SearchContext)

    return (
        <>
            <Header />
            <h1>Search page</h1>
            <ul>
                {result.map((data, index) => (
                    <li key={index}>
                        <Backdrop path={data.backdrop_path || data.poster_path} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Search
