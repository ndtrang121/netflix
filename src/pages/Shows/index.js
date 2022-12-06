import { Fragment } from 'react'
import Slider from '~/layouts/components/Slider'

function Shows() {
    return (
        <Fragment>
            <Slider path="/trending/tv/week" page="2" title={'Released in the Past Year'} />
            <Slider path="/discover/tv" genres="10759" title={'Action & Adventure Shows'} />
            <Slider path="/discover/tv" genres="80" title={'Crime Shows'} />
            <Slider path="/discover/tv" genres="16" title={'Animation Shows'} />
            <Slider path="/discover/tv" genres="99" title={'Documentary Shows'} />
            <Slider path="/discover/tv" genres="18" title={'Drama Shows'} />
            <Slider path="/discover/tv" genres="10762" title={'Kids Shows'} />
            <Slider path="/discover/tv" genres="37" title={'Exciting Western Shows'} />
            <Slider path="/discover/tv" genres="10751" title={'Family Shows'} />
            <Slider path="/discover/tv" genres="10764" title={'Reality Shows'} />
        </Fragment>
    )
}

export default Shows
