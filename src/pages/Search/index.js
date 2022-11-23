import { useContext, Fragment } from 'react'
import { SearchContext } from '~/components/SearchContextProvider'
import Header from '~/layouts/components/Header'
import MiniModalMovie from '~/layouts/components/MiniModalMovie'
import Movie from '~/layouts/components/Movie'

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
