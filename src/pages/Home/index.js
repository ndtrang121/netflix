import { Fragment } from 'react'
import Slider from '~/layouts/components/Slider'

const list_id = process.env.REACT_APP_LIST_ID

function Home() {
    return (
        <Fragment>
            <Slider path={`/list/${list_id}`} title={'My List'} />
            <Slider
                path="/discover/movie"
                genres="28"
                title={'Action Movies'}
            />
            <Slider
                path="/discover/movie"
                genres="27"
                title={'Horror Movies'}
            />
            <Slider
                path="/discover/tv"
                genres="99"
                title={'Documentary Shows'}
            />
            <Slider
                path="/discover/movie"
                genres="16"
                title={'Animation Movies'}
            />
            <Slider path="/discover/movie" genres="10770" title={'TV Movies'} />
            <Slider
                path="/discover/tv"
                genres="37"
                title={'Exciting Western Shows'}
            />
            <Slider
                path="/discover/movie"
                genres="878"
                title={'Science Fiction Movies'}
            />
            <Slider path="/discover/tv" genres="10751" title={'Family Shows'} />
            <Slider
                path="/discover/movie"
                genres="37"
                title={'Exciting Western Movies'}
            />
            <Slider path="/discover/movie" genres="18" title={'Drama Movies'} />
            <Slider
                path="/discover/movie"
                genres="10751"
                title={'Family Movies'}
            />
        </Fragment>
    )
}

export default Home
