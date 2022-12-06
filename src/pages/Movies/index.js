import { Fragment } from 'react'
import Slider from '~/layouts/components/Slider'

// eslint-disable-next-line no-unused-vars
const list_id = process.env.REACT_APP_LIST_ID

function Movies() {
    return (
        <Fragment>
            <Slider path="/trending/movie/week" page="2" title={'Released in the Past Year'} />
            <Slider path="/discover/movie" genres="28" title={'Action Movies'} />
            <Slider path="/discover/movie" genres="27" title={'Horror Movies'} />
            <Slider path="/discover/movie" genres="16" title={'Animation Movies'} />
            <Slider path="/discover/movie" genres="10770" title={'TV Movies'} />
            <Slider path="/discover/movie" genres="18" title={'Drama Movies'} />
            <Slider path="/discover/movie" genres="878" title={'Science Fiction Movies'} />
            <Slider path="/discover/movie" genres="37" title={'Exciting Western Movies'} />
            <Slider path="/discover/movie" genres="10751" title={'Family Movies'} />
            <Slider path="/discover/movie" genres="10752" title={'War Movies'} />
        </Fragment>
    )
}

export default Movies
