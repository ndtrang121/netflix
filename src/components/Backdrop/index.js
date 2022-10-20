import { images } from '~/assets/media'

const Backdrop = ({ path, className, large = false }) => {
    return (
        <img
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
