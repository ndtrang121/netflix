import { images } from '~/assets/media'

const Backdrop = ({ path, className, large = false, style, ...passProps }) => {
    console.log('re-render')
    return (
        <img
            {...passProps}
            style={style}
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

export default Backdrop
