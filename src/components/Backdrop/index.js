import { memo } from 'react'
import Loading from '../Loading'

const Backdrop = ({ path, className, large = false, style, ...passProps }) => {
    console.log('re-render')
    return path ? (
        <img
            {...passProps}
            style={style}
            className={className}
            src={large ? `https://image.tmdb.org/t/p/original${path}` : `https://image.tmdb.org/t/p/w500${path}`}
            alt="backdrop"
        />
    ) : (
        <Loading />
    )
}

export default memo(Backdrop)
