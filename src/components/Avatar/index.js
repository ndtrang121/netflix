import { images } from '~/assets/media'

function Avatar({ src = images.noImage, className }) {
    return <img className={className} src={src} alt="Your avatar" />
}

export default Avatar
