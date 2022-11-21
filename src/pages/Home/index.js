import classNames from 'classnames/bind'
import { Fragment } from 'react'
import Slider from '~/layouts/components/Slider'

import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <Fragment>
            <Slider path="/trending/all/week" title={'My List'} page="5" />
            <Slider
                path="/trending/all/week"
                page="2"
                title={'Trending On Netflix'}
            />
            <Slider
                path="/trending/all/week"
                page="3"
                title={'Popular On Netflix'}
            />
            <Slider
                path="/trending/movie/week"
                page="2"
                title={'Popular On Netflix'}
            />
        </Fragment>
    )
}

export default Home
