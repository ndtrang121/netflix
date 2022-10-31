export default function detectDevice() {
    let device = 'desktop'
    let itemsToShow = 6
    let marginRight = 8
    let padding = 60
    const width = window.innerWidth

    if (width > 1601) {
        device = 'desktop'
        itemsToShow = 6
        marginRight = 8
        padding = 60
    } else if (width <= 1600 && width > 1280) {
        device = 'laptop'
        itemsToShow = 5
        marginRight = 6
        padding = 50
    } else if (width <= 1280 && width > 840) {
        device = 'tablet'
        itemsToShow = 4
        marginRight = 4
        padding = 40
    } else {
        device = 'mobile'
        itemsToShow = 3
        marginRight = 2
        padding = 30
    }

    return { device, itemsToShow, marginRight, padding }
}
