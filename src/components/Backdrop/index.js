import { forwardRef } from 'react'
import { images } from '~/assets/media'

const Backdrop = ({ path, className, large = false, style }, ref) => {
    return (
        <img
            style={style}
            ref={ref}
            className={className}
            src={
                path
                    ? large
                        ? `https://image.tmdb.org/t/p/original${path}`
                        : `https://image.tmdb.org/t/p/w500${path}`
                    : images.noImage
            }
            alt="backdrop"
        />
    )
}

export default forwardRef(Backdrop)
