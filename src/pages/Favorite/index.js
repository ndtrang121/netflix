import { Fragment } from 'react'
import Loading from '~/components/Loading'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'

function Favorite() {
    return (
        <Fragment>
            <Header />
            <Loading />
            <a href="/favorite?v=a;lsfjalsfjasfl">test</a>
            <Footer />
        </Fragment>
    )
}

export default Favorite
