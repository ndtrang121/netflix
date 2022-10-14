import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import { AuthContext } from '~/components/Auth'

function Home() {
    const { setAuth } = useContext(AuthContext)

    const handleLogout = () => {
        setAuth(false)
        window.localStorage.setItem('MY_APP_STATE', false)
    }

    return (
        <>
            <h1>Home page</h1>
            <Link to="/favorite" className="link-home">
                Go favorite
            </Link>
            <Button onClick={handleLogout}>Log Out</Button>
        </>
    )
}

export default Home
