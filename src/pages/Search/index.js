import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import { AuthContext } from '~/components/Auth'
import Header from '~/layouts/components/Header'

function Search() {
    const { setAuth } = useContext(AuthContext)

    const handleLogout = () => {
        setAuth(false)
        window.localStorage.setItem('MY_APP_STATE', false)
    }
    return (
        <>
            <Header />
            <h1>Search page</h1>
            <Link to="/favorite" className="link-home">
                Go favorite
            </Link>
            <Button onClick={handleLogout}>Log Out</Button>
        </>
    )
}

export default Search
