import { useContext, Fragment } from 'react'
import MiniModalMovie from '~/components/MiniModalMovie'
import Movie from '~/components/Movie'
import { SearchContext } from '~/components/SearchContextProvider'
import Header from '~/layouts/components/Header'

function Search() {
    const { result } = useContext(SearchContext)

    return (
        <Fragment>
            <Header />
            <h1>Search page</h1>
            <ul>
                {result.map((data, index) => (
                    <li key={index}>
                        <Movie data={data}></Movie>
                    </li>
                ))}
            </ul>
            <MiniModalMovie />
        </Fragment>
    )
}

export default Search
