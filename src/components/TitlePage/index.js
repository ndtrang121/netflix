import { useEffect } from 'react'

function TitlePage({ children, title }) {
    useEffect(() => {
        document.title = title + ' - Netflix'
    }, [title])

    return children
}

export default TitlePage
