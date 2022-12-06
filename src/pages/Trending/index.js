import { Fragment } from 'react'
import Slider from '~/layouts/components/Slider'

// eslint-disable-next-line no-unused-vars
const list_id = process.env.REACT_APP_LIST_ID

function Trending() {
    return (
        <Fragment>
            <Slider path="/trending/all/week" page="1" title={'New on Netflix'} />
            <Slider path="/trending/all/week" page="2" title={'Coming This Week'} />
            <Slider path="/trending/all/week" page="3" title={'Coming Next Week'} />
            <Slider path="/trending/all/week" page="4" title={'Worth the Wait'} />
        </Fragment>
    )
}

export default Trending
